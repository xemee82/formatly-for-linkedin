# Chrome Web Store & Edge Add-ons 开发者后台提交完整指南 (CHROMEWEBSTORE.md)

> **版本**：v1.0.0 Production Ready  
> **最后更新**：2026-09-20  
> **适用平台**：Google Chrome Web Store Developer Dashboard / Microsoft Edge Partner Center  
> **项目名称**：Formatly for LinkedIn: Bold, Italic & Font Styles  

---

## 1. 基础信息清单 (Store Listing Basics)

| 字段 (Field) | 提交内容 (Value) | 说明 / 约束 |
| :--- | :--- | :--- |
| **Extension Name**<br>(扩展名称) | `Formatly for LinkedIn: Bold, Italic & Font Styles` | 严格遵守平台商标命名政策，避免直接以 LinkedIn 开头（50 字符，符合 ≤75 字符上限） |
| **Summary / Short Description**<br>(简短描述) | `Format LinkedIn posts with bold, italic, and stylish fonts instantly. Select text in any post or comment to format.` | 114 字符（严格满足 ≤132 字符上限），用于搜索列表及推荐卡片 |
| **Category**<br>(类别) | `Productivity` (生产力) 或 `Social & Communication` (社交与通讯) | 优先选择 Productivity |
| **Primary Language**<br>(主语言) | `English (United States)` | 商店后台支持后续添加其他语言本地化 |
| **Single Purpose Statement**<br>(单一用途声明) | `Provides an inline floating formatting toolbar to convert selected text into bold, italic, and stylish Unicode fonts directly within LinkedIn editors.` | 审核团队必读，一句话精确阐明核心功能 |

---

## 2. 详细描述 (Detailed Description)

> 💡 **操作指南**：直接复制以下虚线框内的纯文本内容，粘贴至 Chrome/Edge 开发者后台的 **Description** 文本框中（纯文本排版，已兼容商店纯文本换行格式，已包含必要的商标免责声明）：

```text
Formatly for LinkedIn makes your posts, comments, and articles stand out with stylish bold, italic, and Unicode typography—instantly, without ever leaving LinkedIn.

Stop switching tabs to copy-paste from external generator websites. Just select any text inside LinkedIn's post composer or comment box, and a sleek floating toolbar will appear right above your cursor.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ KEY FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Instant Floating Toolbar: Appears seamlessly when you select text in any editable post, comment, or article.
• 5 Essential Styles:
  - 𝐁𝐨𝐥𝐝 (Serif Bold)
  - 𝐼𝑡𝑎𝑙𝑖𝑐 (Serif Italic)
  - 𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄 (Serif Bold Italic)
  - 𝗕𝗼𝗹𝗱 (Sans-Serif Bold)
  - Aa (One-click Revert to plain text)
• Universal Compatibility: Formatted with standard Unicode characters. Your text renders perfectly on iOS, Android, desktop browsers, and email notifications—no plugins required for readers!
• Full Undo/Redo Support: Fully synchronized with LinkedIn's internal editor. Press Cmd+Z / Ctrl+Z anytime to undo.
• Zero Distraction: No complicated settings or bloated side panels. It only shows up when you need it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 HOW TO USE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Start writing a post or comment on LinkedIn.
2. Highlight/select the text you want to emphasize with your mouse.
3. Click "B", "I", or any style on the floating black toolbar.
4. Your text formats instantly. Highlight again and click "Aa" to revert to normal text anytime!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 PRIVACY & SECURITY FIRST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Zero sensitive permissions: Does not request browsing history, identity, storage, or external API access.
• 100% Local: All conversions happen completely offline inside your browser. No data is collected, stored, or sent over the internet.
• Fully compliant with LinkedIn's Content Security Policy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 DISCLAIMER & ACKNOWLEDGMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This extension is an independent open-source project and is NOT affiliated with, endorsed, sponsored, or otherwise related to LinkedIn Corporation or its affiliates. LinkedIn is a registered trademark of LinkedIn Corporation.

Formatly for LinkedIn is open source under the MIT License.
GitHub Repository: https://github.com/tylerhuang/formatly-for-linkedin
```

---

## 3. 隐私权与合规问卷填报 (Privacy & Justification)

在 Chrome Web Store 开发者后台的 **“Privacy (隐私与合规)”** 标签页中，逐项填写以下信息：

### 3.1 权限使用说明 (Permissions Justification)
- **Permissions**: `None`（扩展未申请任何扩展 API 权限）。
- **Host Permissions**: `None`（无全局或特定主机权限）。
- **Content Scripts (`https://*.linkedin.com/*`) 声明理由**：
  > *"The content script runs strictly on LinkedIn web pages to detect user text selection inside the post editor and display the floating formatting toolbar. It operates entirely locally and does not read, store, or transmit any user data."*

### 3.2 个人数据收集问卷 (Data Usage Disclosures)
审核问卷中的数据类型请**全部选择否 (No)**：
- [x] **Does the extension collect user data?** ➔ **No**
- [x] Personally identifiable information ➔ **Not collected**
- [x] Health information ➔ **Not collected**
- [x] Financial and payment information ➔ **Not collected**
- [x] Authentication information ➔ **Not collected**
- [x] Personal communications ➔ **Not collected**
- [x] Location ➔ **Not collected**
- [x] Web history ➔ **Not collected**
- [x] User activity ➔ **Not collected**
- [x] Website content ➔ **Not collected**

### 3.3 开发者合规保证 (Certifications)
- [x] **Certify that data is NOT sold to third parties** ➔ 勾选 (Yes)
- [x] **Certify that data is NOT used for purposes unrelated to the core function** ➔ 勾选 (Yes)
- [x] **Certify that data is NOT used to determine creditworthiness or lending purposes** ➔ 勾选 (Yes)

### 3.4 隐私政策公开链接 (Privacy Policy URL)
在后台 **Privacy policy** 输入框中填写公开访问链接：
- 推荐使用 GitHub 仓库公开文件链接：
  `https://github.com/tylerhuang/formatly-for-linkedin/blob/main/PRIVACY_POLICY.md`
- 或 GitHub Raw 链接：
  `https://raw.githubusercontent.com/tylerhuang/formatly-for-linkedin/main/PRIVACY_POLICY.md`

---

## 4. 上架视觉素材清单 (Store Visual Assets)

本仓库已自动生成符合平台像素规范的全部图像文件，位于 `store-assets/` 与 `icons/` 目录：

| 素材类型 | 尺寸规范 | 状态 | 文件路径 | 上传位置说明 |
| :--- | :--- | :--- | :--- | :--- |
| **Store Icon (商店图标)** | 128×128 PNG | ✅ 已就绪 | `icons/icon-128.png` | 基础信息 - 商店图标 |
| **Screenshot 1 (划选工具栏)** | 1280×800 PNG | ✅ 已就绪 | `store-assets/screenshot-1-toolbar.png` | 商店详情 - 屏幕截图 (强制至少 1 张) |
| **Screenshot 2 (风格与排版)** | 1280×800 PNG | ✅ 已就绪 | `store-assets/screenshot-2-styles.png` | 商店详情 - 屏幕截图 |
| **Small Promo Tile (推广横幅)** | 440×280 PNG | ✅ 已就绪 | `store-assets/promo-tile-440x280.png` | 商店详情 - 宣传小磁贴 (推荐必填) |

---

## 5. 开源致谢与架构创新声明 (Open Source Heritage)

本项目在开发初期参考了 GitHub 开源项目 [viclafouch/beautify-post](https://github.com/viclafouch/beautify-post) (MIT License，作者 Victor de la Fouchardiere)。在此对其早期的交互探索表示衷心感谢！

针对 2026 年现代 LinkedIn 生产环境，Formatly 进行了 **100% 的底层重写与架构升级**：
1. **轻量化 95%**：废除 React 18 / Webpack 臃肿技术栈，改用零依赖的纯原生 Vanilla ES6+ 架构（发布包仅 ~35KB）；
2. **现代 LinkedIn Shadow DOM 穿透**：攻克了现代 LinkedIn `#interop-outlet` 内跨边界 Selection Retargeting 归零陷阱；
3. **免疫 Trusted Types CSP**：全量改写为纯原生 DOM API 构建，彻底解决现代 LinkedIn 的 TrustedHTML 拦截；
4. **Quill 编辑器撤销栈同步**：采用底层 `execCommand('insertText')` 保障发帖框输入模型同步、点亮 Post 按钮并完整保留 Cmd+Z 撤销历史；
5. **场景与样式补全**：全面覆盖发帖框、评论区、文章编辑器，并新增无衬线粗体 (Sans-Serif Bold)。

---

## 6. 开发者发布三步实操步骤

1. **打包 ZIP 文件**：
   运行自动化打包命令（已自动排除 Git、开发脚本与文档）：
   ```bash
   node scripts/package.js
   ```
   将在根目录生成标准的 `formatly-for-linkedin-v1.0.0.zip`。
2. **前往商店控制台上传**：
   - **Chrome Web Store Developer Console**: [https://chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole)
   - **Microsoft Edge Partner Center**: [https://partner.microsoft.com/dashboard/microsoftedge](https://partner.microsoft.com/dashboard/microsoftedge)
3. **填写表单并提交**：
   - 对应上传 `formatly-for-linkedin-v1.0.0.zip`；
   - 粘贴本文档第 1、2、3 节的内容；
   - 上传 `icons/icon-128.png` 以及 `store-assets/` 下的 3 张截图/磁贴；
   - 点击 **Submit for Review (提交审核)**。审核通常在 1~3 个工作日内完成。
