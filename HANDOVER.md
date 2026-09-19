# Formatly for LinkedIn — 项目开发交接与上下文全景文档 (Master Handover Document)

> **版本**：v1.0.0 Production Ready  
> **文档性质**：独立仓库交接文档（Self-Contained Handover Dossier）  
> **面向对象**：后续接手本项目的开发者、独立 IDE / AI Coding Agent 会话、开源维护者  
> **最后更新时间**：2026-09-20  

---

## 1. 项目概况与产品定位 (Project Identity & Strategy)

### 1.1 项目简介
**Formatly for LinkedIn**（内部代号：`linkedin-text-formatter`）是一款专为 LinkedIn 打造的轻量、纯本地、无感知、零敏感权限的浏览器扩展（Manifest V3）。
用户在 LinkedIn 的发帖框（Post Composer）、评论区（Comments）或文章编辑器中，通过鼠标拖拽划选任意文本，即可在选区上方瞬间唤起黑色悬浮工具栏，一键将文字转换为 Unicode 粗体、斜体、无衬线体等多种艺术排版风格，或一键还原为纯文本。

### 1.2 商业战略定位：【路线 A：高净值流量漏斗 / 获客引流钩子 (Lead Magnet)】
在商业可行性评估中，团队明确确立了**路线 A 战略**：
- **不设付费墙 (No Paywall)**：Unicode 字符转换本身无技术壁垒，强推订阅或付费会导致用户流失至外部免费网页（如 YayText）。
- **定位高净值获客**：在 LinkedIn 上有高频排版强调需求的人群，高度重合了**创作者、创始人 (Founders)、出海投资人、B2B 销售 (SDR)、高级猎头**。
- **开源建立信任**：以 **MIT License** 在 GitHub 完全开源，依靠“零权限、不读任何用户隐私、纯本地离线计算”的极致纯净口碑，快速在 Chrome Web Store 和 Edge Add-ons 积累用户量与 5 星好评。
- **流量沉淀触点**：在扩展的 `popup.html` 界面中植入创作者信息卡片（`Tianlu (Tyler) HUANG` | `Co-founder & COO @ Transfong | Tech Ventures Cross-Border`），提供 `Connect on LinkedIn` 与 `Star on GitHub` 两个高转化入口，将高净值用户直接导流至创作者的个人品牌与核心业务。

---

## 2. 聊天上下文历史与演进复盘 (Conversation History & Context)

为了让新会话/新开发者拥有 100% 完整的历史上下文，以下梳理从零到最终真机验证通过的完整历程：

### 阶段一：本地研发与 Mock 环境验证
1. 确立 5 款核心功能按钮：
   - `B`：衬线粗体（Bold Serif，如 𝐇𝐞𝐥𝐥𝐨）
   - `I`：衬线斜体（Italic Serif，如 𝐻𝑒𝑙𝑙𝑜）
   - `B`：粗斜体（Bold Italic，如 𝑯𝒆𝒍𝒍𝒐）
   - `𝗕`：无衬线粗体（Sans-Serif Bold，如 𝗛𝗲𝗹𝗹𝗼）
   - `Aa`：一键还原普通文本（Revert to plain text）
2. 编写 `unicode-map.js`，基于 Mathematical Alphanumeric Symbols 规范实现双向字符映射。通过了 20/20 单元测试。
3. 搭建了本地富文本模拟页 `tests/mock-linkedin.html`，Puppeteer 自动化跑通了划选、弹窗与加粗流程。

### 阶段二：真实 LinkedIn 生产环境的“滑铁卢”与阻碍
当用户在开发机器的真实 Edge 浏览器挂载扩展并登录 LinkedIn 真实页面时，发现**工具栏无论如何都弹不出来**。
为了实现严格的“闭环测试（Close Loop Test）”，开发团队通过 Chrome 开启远程调试端口（Port 9225），由脚本直接操作用户已登录真实账号（`Tianlu (Tyler) HUANG`）的页面，展开了最深入的底层排查，并精准击碎了四大核心难题（详见第 3 节）。

### 阶段三：攻克三大核心难题并在真机 100% 验证成功
在彻底解决 **Trusted Types CSP**、**Edge 权限拦截** 以及 **Shadow DOM 选区 Retargeting 归零** 之后，在真实 LinkedIn 发帖框中运行了物理鼠标拖拽模拟（`page.mouse.down` -> `page.mouse.move` -> `page.mouse.up`）。
真机自动化截图与用户手动实机操作均确认：**工具栏精准浮动弹出，加粗与还原一键生效，发布按钮正常点亮，Undo 栈完好**。

---

## 3. 四大核心技术难点与攻坚原理 (Technical Post-Mortem)

这是本扩展最宝贵的技术资产。任何接手人员在修改 `content/` 目录时，**必须严格遵守以下准则**：

### 难点 1：LinkedIn 强制执行的 Trusted Types CSP 拦截
- **现象**：Content Script 中只要出现 `template.innerHTML = ...` 或为元素设置 HTML 字符串，Chromium 直接报错：
  `TypeError: Failed to set the 'innerHTML' property on 'Element': This document requires 'TrustedHTML' assignment`，导致脚本静默崩溃。
- **根因**：LinkedIn 生产环境部署了极其严格的内容安全策略（Content Security Policy），封禁了未经签名的字符串 HTML 注入。
- **架构方案**：
  在 [content/toolbar.js](file:///Users/tylerh/Documents/Antigravity/linkedin-text-formatter/content/toolbar.js) 中**彻底根绝 `innerHTML`**。
  所有按钮、结构容器、分隔线全部使用原生 DOM API 构建：
  ```javascript
  const btn = document.createElement('button');
  btn.setAttribute('data-style', 'bold');
  btn.textContent = 'B';
  toolbarElement.appendChild(btn);
  ```
  隔离样式表通过 `styleEl.textContent = '...'` 注入（`textContent` 天然不受 Trusted Types 审查限制）。

### 难点 2：Chromium 跨 Shadow DOM 的选区重定向与尺寸清零 (Selection Retargeting Trap)
- **现象**：在控制台通过 JS 执行 `range.setStart()` 测试完全正常，但真实用户用鼠标在发帖弹窗划选时，工具栏死活不弹。
- **根因（最关键的技术发现）**：
  LinkedIn 的发帖弹窗挂载在一个独立的 Open Shadow Root 中（`<div id="interop-outlet">#shadow-root</div>`）。
  当真实用户使用鼠标划选该 Shadow DOM 内的文字时，Chromium 出于组件封装保护，会发生 **Selection Retargeting（选区重定向）**：
  1. 全局 `window.getSelection().anchorNode` 被重定向为外层宿主容器 `div#root`（非可编辑元素，导致 `isInsideEditable` 误判为不在输入框内）；
  2. 跨边界重定向导致 `window.getSelection().getRangeAt(0).getBoundingClientRect()` 测算宽度与高度全部被强制置为 `0`；
  3. 原代码检测到 `rect.width === 0`，误认为用户只是单击了折叠光标，从而直接 `return` 隐藏工具栏。
- **架构方案**：
  在 [content/selection.js](file:///Users/tylerh/Documents/Antigravity/linkedin-text-formatter/content/selection.js) 中实现**深度穿透探测算法 (Deep Shadow Selection Detector)**：
  ```javascript
  // 1. 递归探测当前处于焦点 (focused) 的 ShadowRoot
  let active = document.activeElement;
  while (active) {
    if (active.shadowRoot && typeof active.shadowRoot.getSelection === 'function') {
      const s = active.shadowRoot.getSelection();
      if (s && s.rangeCount > 0 && !s.isCollapsed && s.toString().trim()) {
        const r = s.getRangeAt(0);
        const rect = r.getBoundingClientRect();
        if (rect && (rect.width > 0 || rect.height > 0)) {
          return { selection: s, range: r, rect, text: s.toString().trim(), anchorNode: s.anchorNode };
        }
      }
    }
    active = active.shadowRoot ? active.shadowRoot.activeElement : null;
  }
  // 2. 检查特定宿主 #interop-outlet，最后回退至全局 window.getSelection()
  ```
  直接从 ShadowRoot 内部提取原生选区，拿到了未被重定向的真实文本节点与精确屏幕物理坐标。

### 难点 3：Manifest V3 权限最小化（规避 Edge 审查挂起）
- **现象**：如果 `manifest.json` 中配置了 `host_permissions: ["https://*.linkedin.com/*"]`，Edge 浏览器在加载时会在左下角弹出横幅：“Permissions needed. Click to set up”，在用户手动点击并授权之前，Edge 彻底挂起 Content Script 的执行。
- **架构方案**：
  保持**零权限模型 (Zero Permissions)**。Manifest V3 规范明确规定：Content Scripts 只要在 `content_scripts[].matches` 中声明目标 URL，浏览器就会按规则自动合法注入，**不需要且不应该声明 `host_permissions` 或 `storage`**。这不仅消除了安装弹窗，也让后续上架 Chrome/Edge 商店时免于冗长的人工代码安全审计。

### 难点 4：Quill.js 富文本编辑器内部状态与 Undo/Redo 栈同步
- **现象**：如果直接操作 DOM（如 `range.deleteContents()` + `range.insertNode()`），虽然界面文字变了，但 LinkedIn 发帖框底部的“Post (发布)”按钮依然保持置灰不可点击，且用户按 `Cmd + Z` 无法撤销。
- **根因**：LinkedIn 使用魔改版 Quill.js，直接 DOM 注入绕过了其内部虚拟数据模型（Delta），导致编辑器认为内容没有变化。
- **架构方案**：
  在 [content/replacer.js](file:///Users/tylerh/Documents/Antigravity/linkedin-text-formatter/content/replacer.js) 中实施分级策略：
  1. 优先调用浏览器底层的原生事务命令：`document.execCommand('insertText', false, convertedText)`。该命令直接模拟用户真实键盘输入，能被 Quill 内部的监听拦截器无缝捕获，自动维护撤销栈并点亮发布按钮；
  2. 仅在 execCommand 异常时，降级采用 Range 替换并显式向编辑框派发合成的 `InputEvent`。

---

## 4. 仓库目录结构与模块说明

```text
linkedin-text-formatter/
├── .git/                      # 本地 Git 仓库 (默认主分支: main)
├── .gitignore                 # 忽略 .DS_Store, node_modules, *.log 等
├── LICENSE                    # MIT 开源许可证 (Copyright 2026 Tianlu (Tyler) HUANG)
├── README.md                  # 用户使用与功能指南
├── HANDOVER.md                # [本文档] 架构与交接全景档案
├── CONTRIBUTING.md            # 开源社区贡献指南
├── STORE_LISTING.md           # Chrome/Edge 商店提交所需全套元数据文案与问卷
├── PRIVACY_POLICY.md          # 商店上架强制要求的公开隐私权政策
├── manifest.json              # MV3 扩展清单 (零敏感权限)
│
├── content/                   # 核心 Content Script 逻辑
│   ├── unicode-map.js         # Unicode 字符映射与双向转换核心
│   ├── unicode-map.test.js    # 映射表自动化单元测试 (20/20 全部通过)
│   ├── selection.js           # 选区探测器 (Shadow DOM 穿透、Retargeting 修复)
│   ├── toolbar.js             # 悬浮工具栏 UI (纯 DOM API、Shadow DOM 样式隔离)
│   ├── replacer.js            # 文本替换引擎 (execCommand 状态同步)
│   ├── content.css            # 宿主层基础隔离样式
│   └── content.js             # 胶水调度入口
│
├── background/
│   └── background.js          # Service Worker 基础常驻保活
│
├── popup/                     # 点击扩展图标弹出的操作面板
│   ├── popup.html             # 高净值获客 Lead Magnet 名片卡片
│   └── popup.js               # 安全打开外部链接 (规避 CSP)
│
├── icons/                     # 图标资产库
│   ├── icon.svg               # 当前编译基准矢量文件
│   ├── icon-aa.svg            # 方案 2 (Aa 顶级排版款矢量源文件)
│   ├── icon-16.png            # 16x16 工具栏图标
│   ├── icon-32.png            # 32x32 Retina 工具栏图标
│   ├── icon-48.png            # 48x48 扩展管理图标
│   ├── icon-128.png           # 128x128 商店主图
│   ├── icon-512.png           # 512x512 高清宣传母版
│   └── concepts/              # 大胆先锋设计方案渲染库
│       ├── concept-f.svg / .png       # 方案 1：F 激光切角先锋款
│       ├── concept-aa.svg / .png      # 方案 2：Aa 排版大师款 (推荐)
│       └── concept-boldb.svg / .png   # 方案 3：B 双面解构款
│
└── generate-icons.js          # 离线图标生成工具脚本
```

---

## 5. 模块内部 API 契约

| 模块对象 | 核心公开接口 | 作用与约束 |
| :--- | :--- | :--- |
| `window.UnicodeMap` | `convertText(text, style)`<br>`revertText(text)` | 转换或还原文本。支持：`bold`, `italic`, `boldItalic`, `sansSerifBold`, `revert`。纯数学偏移计算，无网络请求。 |
| `window.SelectionDetector` | `init(callback)`<br>`destroy()` | 监听 `selectionchange`、`mouseup`、`keyup`（防抖 60ms）。回调返回 `{ text, rect, range, selection }`。 |
| `window.FloatingToolbar` | `init(onFormatClick)`<br>`show(rect)`<br>`hide()` | 创建 Open Shadow DOM 宿主。计算屏幕视口，智能居中，自动避障（上方空间不足时翻转至下方）。 |
| `window.TextReplacer` | `applyFormat(style, selectionInfo)` | 优先执行 `execCommand('insertText')`，失败时调用 Range fallback。 |

---

## 6. 开发者快速上手与日常维护指南 (Developer Quick-Start)

### 6.1 本地加载开发
1. 打开 Chrome 或 Edge，进入 `chrome://extensions` 或 `edge://extensions`；
2. 开启右上角 **“开发者模式” (Developer mode)**；
3. 点击 **“加载已解压的扩展程序” (Load unpacked)**，选中本项目根目录即可；
4. **修改代码后调试 SOP**：
   - 每次修改 `content/` 中的代码后，在扩展管理页点击插件卡片的 **⟳ (重新加载)** 图标；
   - **切回 LinkedIn 页面按 `Cmd + R` (F5) 刷新一次页面**（浏览器机制决定了已有页面必须刷新才能重载新的 Content Script）。

### 6.2 运行自动化单元测试
```bash
# 执行映射表与还原逻辑的单元测试 (20/20 验证)
node content/unicode-map.test.js
```

### 6.3 打包生产分发包 (Release Zip)
若要更新商店上架包或传输给其他机器：
```bash
# 根目录下打包，自动排除 git、DS_Store 与临时测试代码
zip -r linkedin-text-formatter.zip . -x "*.git*" "*.DS_Store" "*__MACOSX*" "*.test.js"
```

### 6.4 推送至 GitHub 开源仓库
当您在 GitHub 创建好对应仓库后，直接在本地执行：
```bash
git remote add origin https://github.com/<your-username>/formatly-for-linkedin.git
git push -u origin main
```

---

## 7. 商店上架审查核对清单 (Store Submission Checklist)

在向 Chrome Web Store 或 Edge Add-ons 提交审核时，请对照以下各项：

- [x] **扩展名称合规**：采用 `Formatly for LinkedIn: Bold, Italic & Font Styles`（绝不直接以 LinkedIn 开头，避免侵权下架）。
- [x] **单一用途说明 (Single Purpose)**：已填入 `STORE_LISTING.md`（说明本扩展专注发帖框 Unicode 文本格式化）。
- [x] **零权限与无数据收集**：在商店 Privacy 页面所有 Data Collection 均勾选 **No**。
- [x] **公开隐私政策链接 (Privacy Policy URL)**：将 `PRIVACY_POLICY.md` 托管至公开链接（如 GitHub 仓库或 Notion），填入审核后台。
- [x] **高清图标准备**：`icons/icon-128.png` 已符合 128x128 PNG 规范。
- [x] **功能演示截图**：已具备实机运行真实划选与加粗效果截图（`real-mouse-drag-popup.png`、`real-mouse-drag-bold.png`）。
