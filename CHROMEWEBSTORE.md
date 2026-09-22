# Chrome Web Store & Edge Add-ons 开发者后台提交完整指南

> **版本**：v1.1.0  
> **最后更新**：2026-09-22  
> **适用平台**：Google Chrome Web Store Developer Dashboard / Microsoft Edge Partner Center  
> **项目名称**：Formatly for LinkedIn & X: Bold, Italic & Font Styles  

---

## 1. 基础信息清单 (Store Listing Basics)

| 字段 (Field) | 提交内容 (Value) | 说明 / 约束 |
| :--- | :--- | :--- |
| **Extension Name**<br>(扩展名称) | `Formatly for LinkedIn & X: Bold, Italic & Font Styles` | 严格遵守平台商标命名政策（54 字符，符合 ≤75 字符上限） |
| **Summary / Short Description**<br>(简短描述) | `Format LinkedIn & X (Twitter) posts, comments, threads & replies with bold, italic & stylish fonts. Select text to format instantly.` | 132 字符（正好满足 ≤132 字符上限） |
| **Category**<br>(类别) | `Productivity` (生产力) 或 `Social & Communication` (社交与通讯) | 优先选择 Productivity |
| **Primary Language**<br>(主语言) | `English (United States)` | 商店后台支持后续添加其他语言本地化 |
| **Single Purpose Statement**<br>(单一用途声明) | `Provides an inline floating formatting toolbar to convert selected text into bold, italic, and stylish Unicode fonts directly within LinkedIn and X (Twitter) editors.` | 审核团队必读，一句话精确阐明核心功能 |

---

## 2. 详细描述 (Detailed Description)

> 💡 **操作指南**：直接复制 STORE_LISTING.md 第 2 节中的纯文本框内容，粘贴至开发者后台 Description 文本框。

---

## 3. 隐私权与合规问卷 (Privacy Practices Tab)

### 3.1 Single Purpose Description
> `Provides an inline floating formatting toolbar to convert selected text into bold, italic, and stylish Unicode fonts directly within LinkedIn and X (Twitter) editors.`

### 3.2 Permission Justification (权限使用理由)
- 本扩展在 `manifest.json` 中 **声明了 0 项 permissions**。
- **Content Scripts 声明理由**：
  - `https://*.linkedin.com/*`, `https://*.x.com/*`, `https://*.twitter.com/*`
  > `The content script runs strictly on LinkedIn and X (Twitter) web pages to detect user text selection inside post and tweet editors and display the floating formatting toolbar. It operates entirely locally and does not read, store, or transmit any user data.`

### 3.3 Data Usage (数据收集问卷)
问卷所有项勾选 **"No (不收集任何数据)"**：
- [x] Does your extension collect or use any user data? -> **No**
- [x] 勾选两项开发者诚信承诺。

---

## 4. 上架资源文件速查

所有素材均已保存在 iCloud 目录：  
`/Users/tylerh/Library/Mobile Documents/com~apple~CloudDocs/Formatly_Store_Assets/`

- **ZIP 上传包**: `formatly-v1.1.0.zip`
- **应用图标**: `icons/icon-128.png` (128×128)
- **截图 1**: `screenshot-1-toolbar.png` (1280×800)
- **截图 2**: `screenshot-2-styles.png` (1280×800)
- **小促销图**: `promo-tile-440x280.png` (440×280)
- **大横幅图**: `marquee-promo-1400x560.png` / `.jpg` (1400×560, 24-bit 无 Alpha)

---

## 5. v1.1.0 更新提交说明

在更新现有 Edge 商店上架或重新提交 Chrome 审核时，在 **"What's new in this version"** 或 **Changelog** 字段填入：

```text
v1.1.0 Changelog:
- NEW: Full X (Twitter) support — format tweets, threads, and replies with bold, italic & font styles. No X Premium required.
- FIXED: Resolved an issue where the toolbar host element could intermittently block clicks on LinkedIn's Messaging panel and navigation overlays.
- IMPROVED: Toolbar host element now uses zero-size anchor architecture to eliminate all pointer-event conflicts with underlying page elements.
- EXPANDED: Site scope now includes *.x.com and *.twitter.com alongside *.linkedin.com.
```
