# Formatly for LinkedIn: Bold, Italic & Font Styles

一款专为 LinkedIn 设计的轻量级、纯本地、零敏感权限浏览器扩展（Manifest V3）。在 LinkedIn 发帖框、评论区或文章编辑器中划选任意文字，即可瞬间弹出浮动工具栏，一键将文字转换为加粗、斜体等多种 Unicode 艺术字体，或一键还原为普通文本。

---

## 核心特性

- **划选即弹 (Instant Floating Toolbar)**：在任何 LinkedIn 可编辑区域选中文本，工具栏自动在文字上方精准浮动，带箭头指示。
- **5 款精选核心样式**：
  1. **B**：衬线粗体（Bold Serif，如 𝐇𝐞𝐥𝐥𝐨）
  2. **I**：衬线斜体（Italic Serif，如 𝐻𝑒𝑙𝑙𝑜）
  3. **B**：粗斜体（Bold Italic，如 𝑯𝒆𝒍𝒍𝒐）
  4. **𝗕**：无衬线粗体（Sans-Serif Bold，如 𝗛𝗲𝗹𝗹𝗼）
  5. **Aa**：快速还原（Revert，一键恢复为普通无格式英文字符）
- **真·全平台兼容**：采用纯 Unicode 字符集映射，而非 HTML 富文本标签。无论读者使用的是 LinkedIn 网页端、iOS/Android App、桌面端还是邮件预览，格式均能原样呈现，绝不丢失。
- **LinkedIn 深度安全适配**：
  - **CSP 免疫**：纯 DOM API 构建，彻底规避 LinkedIn 生产环境强制开启的 `Trusted Types` 安全策略阻拦。
  - **Shadow DOM 穿透**：无缝支持 LinkedIn 2026 新版挂载在 `#interop-outlet` Shadow DOM 内部的发帖弹窗与评论框。
  - **Undo/Redo 栈同步**：优先调用 `document.execCommand('insertText')`，完美兼容 Quill.js 编辑器的撤销重做栈与字数统计。
- **零权限、零遥测**：不申请任何额外权限（无 `host_permissions`、无 `storage`），纯本地离线瞬时处理。

---

## 安装说明

### 1. Microsoft Edge 安装步骤
1. 打开 Edge 浏览器，在地址栏输入 `edge://extensions` 并回车；
2. 在左侧菜单底部，打开 **“开发人员模式” (Developer mode)** 开关；
3. 点击顶部出现的 **“加载解压缩的扩展” (Load unpacked)** 按钮；
4. 在弹出的文件选择窗口中，选中本项目的根目录（`linkedin-text-formatter` 文件夹），点击选择；
5. 打开或刷新任意 LinkedIn 网页（如 `https://www.linkedin.com/feed/`），即可开始使用。

### 2. Google Chrome 安装步骤
1. 打开 Chrome 浏览器，在地址栏输入 `chrome://extensions` 并回车；
2. 开启右上角的 **“开发者模式” (Developer mode)** 开关；
3. 点击左上角的 **“加载已解压的扩展程序” (Load unpacked)** 按钮；
4. 选中 `linkedin-text-formatter` 文件夹；
5. 打开或刷新 LinkedIn 网页即可使用。

---

## 使用指南

1. **发帖/评论**：
   在 LinkedIn 首页点击“Start a post (发起帖子)”或定位到任意帖子的评论输入框。
2. **输入与划选**：
   键入您的文本内容，用鼠标拖拽划选您想要强调的关键词或段落。
3. **一键格式化**：
   黑色悬浮工具栏会自动在选区上方弹出。点击 **B**、**I**、粗斜体或无衬线粗体，文字立即变身。
4. **一键撤销/还原**：
   如果想恢复纯文本，只需划选已加粗的文字，点击工具栏最右侧的 **Aa** 按钮，或直接使用系统快捷键 `Cmd + Z` / `Ctrl + Z`。

---

## 项目目录结构

```text
linkedin-text-formatter/
├── manifest.json              # Manifest V3 扩展配置文件（零敏感权限）
├── content/
│   ├── unicode-map.js         # Unicode 字符映射表与正反向双向转换核心
│   ├── unicode-map.test.js    # 映射表自动化单元测试 (20/20 验证用例)
│   ├── selection.js           # 选区探测器 (深度支持 Shadow DOM、Retargeting 修复)
│   ├── toolbar.js             # 浮动工具栏 UI (Shadow DOM 隔离、纯 DOM API、Trusted Types 免疫)
│   ├── replacer.js            # 文本替换引擎 (execCommand + Range fallback 状态同步)
│   ├── content.css            # 宿主层基础隔离样式
│   └── content.js             # Content Script 主入口胶水层
├── popup/
│   ├── popup.html             # 扩展状态弹出页与创作者卡片
│   └── popup.js               # 安全打开外部链接
├── icons/                     # 16x16, 32x32, 48x48, 128x128 扩展高清图标
├── store-assets/              # 商店提交用 1280x800 截图与 440x280 推广小磁贴
├── CHROMEWEBSTORE.md          # Chrome Web Store & Edge Add-ons 提交全套物料
├── STORE_LISTING.md           # 商店文案资料包
├── PRIVACY_POLICY.md          # 隐私权政策 (公开托管)
└── HANDOVER.md                # 完整技术架构交接全景文档
```

---

## 开源渊源与致敬 (Acknowledgments)

本项目在初期调研与技术探索阶段，参考了 GitHub 开源项目 [viclafouch/beautify-post](https://github.com/viclafouch/beautify-post) (MIT License，作者：Victor de la Fouchardiere)。在此对其早期的交互范式探索表示感谢！

针对 2026 年现代 LinkedIn 生产环境，本项目进行了 100% 的原生纯重构（摒弃 React/Webpack，包体积缩减 95% 至 ~35KB；攻克了 `#interop-outlet` Shadow DOM 穿透、Trusted Types CSP 规避以及 Quill 撤销栈同步）。详见 [HANDOVER.md](file:///Users/tylerh/Documents/Antigravity/linkedin-text-formatter/HANDOVER.md)。

---

## 免责声明 (Disclaimer)

Formatly for LinkedIn 是一款独立的开源浏览器扩展，与 LinkedIn 官方（LinkedIn Corporation）及其关联方没有任何隶属、认可、赞助或合作关系。LinkedIn 是 LinkedIn Corporation 的注册商标。

---

## 常见问题与排错 (FAQ)

**Q：加载扩展后在发帖框划选没有弹出工具栏？**  
A：
1. 确保扩展已成功启用（在 `edge://extensions` 或 `chrome://extensions` 中开关为开启状态）；
2. 扩展更新或重载后，**必须按 `Cmd + R` (Mac) 或 `F5` (Windows) 刷新一次 LinkedIn 页面**，以便浏览器将最新 Content Script 注入页面 DOM；
3. 确保选中的文字不是纯空格或空字符。

**Q：格式化后的文字发出去别人能看见吗？**  
A：完全可以。Unicode 数学字母符号属于全平台统一标准编码，任何人的手机、电脑甚至邮件通知都能原生显示，不需要对方安装任何插件。

