# Chrome Web Store & Edge Add-ons 商店上架资料包

本文档整理了提交至 **Google Chrome Web Store** 和 **Microsoft Edge Add-ons** 开发者后台所需的全套元数据、合规文案、隐私申明与审核说明。

---

## 1. 基础信息 (Basic Metadata)

### 扩展名称 (Extension Name)
> ⚠️ **合规警示 (Trademark Policy)**：根据 Google 与微软的商标政策，**切勿直接使用 "LinkedIn Text Formatter" 作为应用主标题**，否则会被审核机器人直接判定为 "Impersonation (冒充官方应用)" 并秒拒或下架。合规格式必须采用 `<产品名> for LinkedIn: <功能描述>`。

- **推荐名称 (Recommended)**: `Formatly for LinkedIn: Bold, Italic & Font Styles` (50 字符)
- **备选名称 A**: `Inline Formatter for LinkedIn: Bold & Italic` (44 字符)
- **备选名称 B**: `BoldIn for LinkedIn: Text Formatter` (36 字符)

### 简短描述 (Short Description)
> 最大限制 132 个字符。展示在搜索列表和推荐卡片中，务必简练且直击痛点。

`Format LinkedIn posts with bold, italic, and stylish fonts instantly. Select text in any post or comment to open the floating toolbar.` (130 字符)

### 类别 (Category)
- **Chrome Web Store**: `Productivity` (生产力) 或 `Social & Communication` (社交与通讯)
- **Edge Add-ons**: `Productivity` (生产力)

### 单一用途声明 (Single Purpose Statement)
> 审核团队必读，需用一句话说明扩展的唯一核心目的。

`Provides an inline floating formatting toolbar to convert selected text into bold, italic, and stylish Unicode fonts directly within LinkedIn editors.`

### 主语言 (Primary Language)
`English (United States)` （可在商店配置多语言本地化）

---

## 2. 商店详细介绍 (Detailed Description)

> 💡 **复制以下内容直接粘贴至开发者后台的 Description 输入框**（商店后台不支持 Markdown 语法，已排版为标准换行符与 ASCII 符号）：

```text
Formatly for LinkedIn provides an inline formatting toolbar directly inside LinkedIn's post composer, comment field, and article editor. It eliminates the need to switch browser tabs to copy-paste formatted text from external generator websites.

Select any text within an editable field on LinkedIn to format it instantly with bold, italic, and Unicode typography.

FEATURES
- Instant Floating Toolbar: Appears directly over selected text within LinkedIn's editor.
- Five Core Styles:
  * Serif Bold (𝐁𝐨𝐥𝐝)
  * Serif Italic (𝐼𝑡𝑎𝑙𝑖𝑐)
  * Serif Bold Italic (𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄)
  * Sans-Serif Bold (𝗕𝗼𝗹𝗱)
  * Plain Revert (Aa): Restores styled text to standard plain characters.
- Universal Compatibility: Uses standard Unicode characters. Styled text renders consistently across iOS, Android, web browsers, and email notifications without requiring plugins for readers.
- Editor Synchronization: Integrates with LinkedIn's internal Quill editor model via native input commands, keeping the submit button active and preserving Cmd+Z / Ctrl+Z undo history.
- Strict Site Isolation: Configured strictly for *.linkedin.com. The extension never runs on or inspects any other website.
- Clean and Unobtrusive: No configuration panels or background processes. The toolbar only displays when text is selected.

HOW TO USE
1. Start writing a post or comment on LinkedIn.
2. Highlight the text you want to format.
3. Click "B", "I", or any style on the floating toolbar.
4. To revert, highlight the styled text and click "Aa", or press Cmd+Z / Ctrl+Z.

PRIVACY & SECURITY
- Zero sensitive permissions: Declares no host permissions, no storage access, and no background worker.
- Site-isolated: Scoped exclusively to *.linkedin.com.
- Local execution: All transformations occur locally in your browser. No data is collected, logged, or transmitted.
- Fully compliant with LinkedIn's Content Security Policy.

DISCLAIMER
Formatly for LinkedIn is an independent open-source project and is not affiliated with, sponsored by, or endorsed by LinkedIn Corporation. LinkedIn is a registered trademark of LinkedIn Corporation.

Open source under the MIT License:
https://github.com/xemee82/formatly-for-linkedin
```

---

## 3. 权限申明与合规问卷 (Permissions Justification)

在 Chrome Web Store 开发者后台的 **“Privacy (隐私与合规)”** 标签页中，请按以下要求填写：

### 权限清单
- **Permissions**: `None` (无任何额外权限)
- **Host Permissions**: `None` (无额外外置主机权限)
- **Content Scripts (`https://*.linkedin.com/*`) 理由说明**:
  > "The content script runs strictly on LinkedIn web pages to detect user text selection inside the post editor and display the floating formatting toolbar. It operates entirely locally and does not read, store, or transmit any user data."

### 个人数据收集申明 (Data Collection Form)
问卷中的所有选项均勾选 **“No (否)”**：
- [x] Does the extension collect user data? -> **No**
- [x] Personally identifiable information -> **Not collected**
- [x] Authentication information -> **Not collected**
- [x] Personal communications / Web history -> **Not collected**
- [x] Certify that data is NOT sold to third parties -> **Checked (已勾选)**
- [x] Certify that data is NOT used for purposes unrelated to the core function -> **Checked (已勾选)**

---

## 4. 上架视觉素材清单 (Visual Assets)

| 素材类型 | 建议尺寸 | 当前状态 | 文件位置 |
| :--- | :--- | :--- | :--- |
| **商店图标 (Store Icon)** | 128×128 PNG | ✅ 已就绪 | `icons/icon-128.png` |
| **高清图标母版** | 512×512 PNG | ✅ 已就绪 | `icons/icon-512.png` |
| **矢量源文件** | SVG | ✅ 已就绪 | `icons/icon.svg` |
| **截图 1 (功能演示)** | 1280×800 PNG | ✅ 已就绪 | `store-assets/screenshot-1-toolbar.png` |
| **截图 2 (排版效果)** | 1280×800 PNG | ✅ 已就绪 | `store-assets/screenshot-2-styles.png` |
| **推广横幅 (Small Promo)** | 440×280 PNG | ✅ 已就绪 | `store-assets/promo-tile-440x280.png` |

---

## 5. 提交发布三步流程

1. **打包最新源码**：
   项目根目录下已准备好合规的 [linkedin-text-formatter.zip](file:///Users/tylerh/Documents/Antigravity/linkedin-text-formatter.zip)。
2. **前往开发者后台**：
   - **Chrome Web Store Developer Dashboard**: `https://chrome.google.com/webstore/devconsole`（需一次性支付 $5 谷歌开发者注册费）。
   - **Microsoft Edge Partner Center**: `https://partner.microsoft.com/dashboard/microsoftedge`（免费注册开发者账号）。
3. **上传并填写**：
   上传 zip 压缩包，复制本文件的标题、描述、权限说明，并填写隐私政策链接即可提交审核。通常审核周期为 **1~3 个工作日**。
