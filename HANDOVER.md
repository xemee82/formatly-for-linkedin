# LinkedIn Inline Formatter 开发交接与技术架构文档 (Handover Document)

## 1. 架构总览 (Architecture Overview)

本扩展采用 Chrome Extension Manifest V3 标准开发，专为 LinkedIn 复杂的富文本编辑环境设计。架构分为以下五个单一职责层：

```text
               ┌──────────────────────────────┐
               │    LinkedIn Web Page DOM     │
               └──────────────┬───────────────┘
                              │ selectionchange / mouseup
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. 选区感知层 (content/selection.js)                         │
│    - 深度穿透 Shadow DOM (遍历 activeElement & #interop-outlet)│
│    - 突破 Chromium 选区 Retargeting 造成的 0 尺寸陷阱        │
│    - 校验原生 isContentEditable 与 Shadow 祖先               │
└─────────────────────────────┬───────────────────────────────┘
                              │ { text, rect, range, selection }
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. 工具栏渲染层 (content/toolbar.js)                         │
│    - Open Shadow DOM 宿主隔离 (#lif-toolbar-host)           │
│    - 100% 纯原生 DOM API 构建（规避 Trusted Types CSP）     │
│    - 视口自适应几何定位算法 (居中计算、上/下反折自适应)       │
└─────────────────────────────┬───────────────────────────────┘
                              │ 用户点击按钮 (bold/italic/revert)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. 字符转换引擎 (content/unicode-map.js)                     │
│    - Mathematical Alphanumeric Symbols 映射表               │
│    - 4 款核心样式正向生成与全量反向普通字符清洗还原          │
└─────────────────────────────┬───────────────────────────────┘
                              │ 目标 Unicode 文本
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. DOM 替换与状态同步层 (content/replacer.js)                │
│    - 优先 document.execCommand('insertText') 维持 Undo 栈   │
│    - 降级采用 Range 替换 + 手动派发 InputEvent               │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. 攻克的四大核心技术难点 (Deep Technical Insights)

在真实 LinkedIn 生产环境中调试时，常规扩展脚本会遭遇多项隐蔽的底层机制拦截。以下是本次开发中攻克的关键技术瓶颈与标准应对方案：

### 难点 1：LinkedIn 强制实施的 Trusted Types CSP
- **现象**：在 Content Script 中执行 `template.innerHTML = ...` 或为元素设置 HTML 字符串时，浏览器直接抛出 `TypeError: Failed to set the 'innerHTML' property on 'Element': This document requires 'TrustedHTML' assignment`，导致脚本静默崩溃。
- **根因**：LinkedIn 配置了极其严格的 Content Security Policy (CSP)，要求所有可能注入 HTML 的操作必须经过 Trusted Types 策略签名。
- **解决方案**：在 [toolbar.js](file:///Users/tylerh/Documents/Antigravity/linkedin-text-formatter/content/toolbar.js) 中彻底取缔 `innerHTML`。所有按钮、分隔线、文本以及隔离样式表（`<style>`），全部使用原生 `document.createElement()`、`setAttribute()`、`textContent` 和 `appendChild()` 构建，天然免疫 CSP 检查。

### 难点 2：Chromium 跨 Shadow DOM 的选区重定向 (Selection Retargeting)
- **现象**：用户在发帖弹窗中用鼠标真实划选文字时，扩展无论如何无法弹出工具栏；然而人工在控制台调用 `document.createRange()` 却能生效。
- **根因**：LinkedIn 的发帖弹窗挂载在 `<div id="interop-outlet">` 的 Shadow Root 内部。Chromium 出于封装边界隔离保护，对用户在屏幕上的真实鼠标拖拽选区进行了跨边界重定向（Retargeting）：
  1. `window.getSelection().anchorNode` 被重定向至顶层容器 `div#root`，由于 `div#root` 并非 contenteditable，被错误拦截；
  2. `window.getSelection().getRangeAt(0).getBoundingClientRect()` 的计算结果被清零（`width: 0, height: 0`），被当作“折叠光标”丢弃。
- **解决方案**：在 [selection.js](file:///Users/tylerh/Documents/Antigravity/linkedin-text-formatter/content/selection.js) 中实现了深度探测算法：
  ```javascript
  // 深度提取当前激活元素或其内部 ShadowRoot 的真实选区
  let active = document.activeElement;
  while (active) {
    if (active.shadowRoot && typeof active.shadowRoot.getSelection === 'function') {
      const s = active.shadowRoot.getSelection();
      // 获取 shadowRoot 内部真实的 Range 与精确 ClientRect
    }
    active = active.shadowRoot ? active.shadowRoot.activeElement : null;
  }
  ```
  直接从 ShadowRoot 抓取未被重定向的真实 DOM 节点与真实物理像素坐标，彻底攻克真机拖选失灵问题。

### 难点 3：Edge 浏览器对 MV3 权限的拦截挂起
- **现象**：扩展在 Edge 中加载后，左下角出现 “Permissions needed. Click to set up” 警告横幅，在用户点击批准之前，浏览器彻底挂起 Content Script 的注入。
- **根因**：`manifest.json` 中声明了 `host_permissions: ["https://*.linkedin.com/*"]`。Edge 对外置主机权限具有严格的初审机制。
- **解决方案**：移除 `manifest.json` 中的 `host_permissions` 与 `storage`。Manifest V3 规定，Content Scripts 只要在 `content_scripts[].matches` 中声明目标站点，即可获得完全合法合规的原生注入权限，无需多余特权，彻底消除权限审查挂起。

### 难点 4：Quill.js 内部状态与 Undo/Redo 栈同步
- **现象**：直接使用 `Range.deleteContents()` + `Range.insertNode()` 插入文字后，LinkedIn 发帖框的“Post”发布按钮依然保持置灰不可用，且用户按 `Cmd + Z` 无法撤销。
- **根因**：LinkedIn 采用魔改版 Quill.js，直接操作 DOM 不会更新 Quill 的 Delta 虚拟模型与撤销历史栈。
- **解决方案**：在 [replacer.js](file:///Users/tylerh/Documents/Antigravity/linkedin-text-formatter/content/replacer.js) 中采用分级策略：
  1. 优先使用 `document.execCommand('insertText', false, text)`，该原生命令能够直接触发浏览器底层的输入事务（Input Transaction），被 Quill 内部拦截器自然捕获，完美保留 Undo/Redo 历史并点亮发布按钮；
  2. 仅在 execCommand 异常时才降级为 Range 替换并显式派发合成 `InputEvent`。

---

## 3. 模块接口与内部约定

### `window.UnicodeMap` ([unicode-map.js](file:///Users/tylerh/Documents/Antigravity/linkedin-text-formatter/content/unicode-map.js))
- `convertText(text: string, styleName: string): string`
  - 将输入纯文本按指定风格转换。支持风格：`bold`, `italic`, `boldItalic`, `sansSerifBold`。
- `revertText(text: string): string`
  - 反向查询字符集，将所有已转换的 Unicode 艺术字无损清洗还原为标准 ASCII 字符。

### `window.SelectionDetector` ([selection.js](file:///Users/tylerh/Documents/Antigravity/linkedin-text-formatter/content/selection.js))
- `init(callback: (info: SelectionInfo | null) => void): void`
  - 启动监听器。防抖时间：60ms。
- `destroy(): void`
  - 解绑所有事件监听。

### `window.FloatingToolbar` ([toolbar.js](file:///Users/tylerh/Documents/Antigravity/linkedin-text-formatter/content/toolbar.js))
- `init(onFormatClick: (style: string) => void): void`
  - 初始化创建宿主 DOM 与 ShadowRoot。
- `show(rect: DOMRect): void`
  - 计算位置并呈现工具栏。
- `hide(): void`
  - 隐藏工具栏并重置淡出动画。

### `window.TextReplacer` ([replacer.js](file:///Users/tylerh/Documents/Antigravity/linkedin-text-formatter/content/replacer.js))
- `applyFormat(styleName: string, selectionInfo?: SelectionInfo): boolean`
  - 执行选区替换核心，返回是否成功。

---

## 4. 自动化测试与持续回归套件

本项目构建了覆盖核心映射与真实 E2E 浏览器的完整测试矩阵：

1. **单元测试 (Unit Tests)**：
   - 路径：`content/unicode-map.test.js`
   - 执行：`node content/unicode-map.test.js`
   - 覆盖率：20/20 验证用例全部通过（涵盖大小写英文字母、数字、标点穿透、双向还原一致性）。

2. **本地 DOM 模拟闭环测试**：
   - 测试文件：`tests/mock-linkedin.html`
   - 验证工具栏在 Quill 类似富文本 DOM 中的注入与定位。

3. **真实 LinkedIn CDP 自动化闭环**：
   - 测试脚本：`/tmp/lif-test/full-live-test.js`
   - 运行方式：连接至启动 `--remote-debugging-port` 的真实 Chrome/Edge 进程，自动完成在真实账户中的发帖弹窗定位、模拟物理鼠标划选、工具栏定位校验、加粗转换及最终文本断言。

---

## 5. 后续迭代建议 (Roadmap)

1. **Chrome Web Store / Edge Add-ons 商店上架**：
   - 当前项目已完全满足商店零权限审核要求（无敏感 host 权限、纯本地逻辑）。
   - 仅需在开发者后台提交 `linkedin-text-formatter.zip` 与宣传物料截图。
2. **快捷键支持 (Keyboard Shortcuts)**：
   - 可在 `manifest.json` 中配置 `commands`（如 `Cmd + B` 或 `Ctrl + Shift + B`），为键盘党提供无需鼠标的沉浸式极速转换。
3. **新增更多轻量样式**：
   - 如需增加下划线 (Combining Low Line `\u0332`) 或中划线 (Combining Long Stroke Overlay `\u0336`)，只需在 `unicode-map.js` 扩展映射方法，并在 `toolbar.js` 中新增对应按钮即可。
