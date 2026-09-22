# Changelog

All notable changes to Formatly are documented in this file.

## [1.1.0] - 2026-09-22

### New: X (Twitter) Platform Support
- **Full X (Twitter) inline formatting**: Format tweets, threads, quote tweets, and reply boxes with bold, italic, bold italic, sans-serif bold, and plain revert — without requiring an X Premium subscription.
- **React/Draft.js state synchronization**: Dispatches native input commands to keep X's character counter circle and Post/Reply button in sync after formatting.
- **X DOM detection**: Supports `role="textbox"` and `data-testid="tweetTextarea_*"` attribute matching for reliable X editor detection.
- **Dual site scope**: Content scripts now run on `*.linkedin.com`, `*.x.com`, and `*.twitter.com`.

### Fixed: Messaging Entry Blocked (LinkedIn)
- **Root cause**: The toolbar host element (`#lif-toolbar-host`) was a `position: fixed; z-index: 2147483647` div with no explicit width/height constraints. As a block-level element, the browser auto-sized it to near-viewport width. Combined with `pointer-events: auto` toggling via CSS `!important` and JavaScript, a large invisible overlay intermittently intercepted clicks on LinkedIn's Messaging panel, navigation buttons, and other UI layers.
- **Fix**: The host element is now constrained to `width: 0; height: 0; overflow: visible` and permanently set to `pointer-events: none`. Only the Shadow DOM inner toolbar (`.lif-toolbar.visible`) receives `pointer-events: auto`. This ensures zero interference with any underlying page element regardless of z-index stacking.

### Changed
- Extension name updated from "Formatly for LinkedIn" to "Formatly for LinkedIn & X" to reflect dual-platform support.
- Popup UI now shows separate status badges for LinkedIn and X (Twitter).
- All console log prefixes unified to `[Formatly]`.
- Store listing descriptions, screenshots, and promotional tiles updated for dual-platform branding.

## [1.0.0] - 2026-09-20

### Initial Release
- Inline floating toolbar for LinkedIn posts, comments, and deeply nested reply threads.
- Five typography styles: Serif Bold, Serif Italic, Serif Bold Italic, Sans-Serif Bold, Plain Revert (Aa).
- Universal Unicode output: renders natively for all readers across iOS, Android, web, and email.
- Editor synchronization via `document.execCommand('insertText')` preserving Cmd+Z / Ctrl+Z undo history.
- Shadow DOM style isolation; pure DOM API construction (zero innerHTML, Trusted Types CSP compliant).
- Strict site isolation: `*.linkedin.com` only.
- Zero permissions: no host permissions, no storage, no background worker.
