# Formatly for LinkedIn & X: Bold, Italic & Font Styles

> **Format LinkedIn and X (Twitter) posts, comments, threads & replies with bold, italic, and stylish fonts instantly.**  
> Free, privacy-first Chrome & Edge browser extension. No X Premium subscription required.

[![Microsoft Edge Add-ons](https://img.shields.io/badge/Edge%20Add--ons-Live-blue?logo=microsoftedge)](https://microsoftedge.microsoft.com/addons/detail/formatly-for-linkedin-bo/ondapfbkhgndgfmffikdkmkklofdomlo)

---

## Features

- **Instant Floating Toolbar**: Highlight any text inside LinkedIn or X to format it instantly. No tab switching, no copy-pasting from generator websites.
- **Full X (Twitter) Support**: Format tweets, threads, quote tweets, and reply boxes without paying for X Premium.
- **LinkedIn Comment & Reply Support**: Works seamlessly across posts, inline feed comments, and deeply nested reply threads without disabling submit buttons.
- **Universal Unicode Output**: Built using standard Unicode Mathematical Alphanumeric Symbols. Renders natively for all followers across web, iOS, iPadOS, Android, and external embeds.
- **Editor State Synchronization**: Employs native `insertText` input commands, ensuring both LinkedIn's Quill and X's React/Draft.js editors keep submit buttons active and character counters accurate.
- **Full Cmd+Z / Ctrl+Z Undo**: Preserves standard browser undo/redo history on both platforms.
- **Strict Site Isolation & Zero Permissions**: Runs exclusively on `*.linkedin.com`, `*.x.com`, and `*.twitter.com`. Declares **zero** host permissions, zero storage permissions, and zero background scripts. 100% local client-side execution.

---

## Supported Typography Styles

| Style Name | Example Output | Description |
| :--- | :--- | :--- |
| **Serif Bold** | `𝐁𝐨𝐥𝐝 𝐓𝐞𝐱𝐭` | Classical high-impact bold typography |
| **Serif Italic** | `𝐼𝑡𝑎𝑙𝑖𝑐 𝐓𝐞𝐱𝐭` | Elegant italic styling for quotes & emphasis |
| **Serif Bold Italic** | `𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄` | Dynamic emphasis for titles & hooks |
| **Sans-Serif Bold** | `𝗕𝗼𝗹𝗱 𝗦𝗮𝗻𝘀` | Modern, clean tech aesthetic |
| **Revert (Plain)** | `Aa Plain Text` | One-click restoration back to standard ASCII |

---

## Quick Start

### Install from Store
- **Edge**: [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/formatly-for-linkedin-bo/ondapfbkhgndgfmffikdkmkklofdomlo)
- **Chrome**: Chrome Web Store (coming soon)

### Load Unpacked (Developer Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/xemee82/formatly-for-linkedin.git
   ```
2. Open `chrome://extensions/` (Chrome) or `edge://extensions/` (Edge).
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the project directory.
5. Open [linkedin.com](https://www.linkedin.com) or [x.com](https://x.com), select any text in an editor, and the toolbar will appear.

---

## Architecture

- **Pure Vanilla ES6+**: Zero build tools, zero bundlers, zero npm dependencies.
- **Shadow DOM Isolation**: The floating toolbar is rendered inside an open Shadow DOM root, preventing CSS conflicts with host site design systems.
- **Trusted Types & CSP Compliant**: Constructed 100% via native DOM APIs (`createElement`, `textContent`, `setAttribute`). Completely avoids `innerHTML`.
- **Zero-Size Anchor Host**: The toolbar host element uses `width: 0; height: 0; overflow: visible` to ensure it never blocks clicks on underlying page elements (including Messaging panels, navigation overlays, etc.).

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full release history.

---

## Creator & Maintainer

**Tianlu (Tyler) HUANG**  
*Co-founder & COO @ Transfong | Tech Ventures Cross-Border*  
- LinkedIn: [linkedin.com/in/tylerhuangsg](https://www.linkedin.com/in/tylerhuangsg/)  
- GitHub: [@xemee82](https://github.com/xemee82)  

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Disclaimer
*Formatly is an independent open-source project and is not affiliated with, sponsored by, or endorsed by LinkedIn Corporation or X Corp. LinkedIn is a registered trademark of LinkedIn Corporation. X and Twitter are registered trademarks of X Corp.*
