const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const assetsDir = path.join(rootDir, 'store-assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// 读取 128 图标转为 base64
const icon128Base64 = fs.readFileSync(path.join(rootDir, 'icons', 'icon-128.png')).toString('base64');
const iconDataUrl = `data:image/png;base64,${icon128Base64}`;

// 页面 1: 划选唤起工具栏截图 (1280x800)
const html1 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1280px;
    height: 800px;
    background: #0F172A;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #F8FAFC;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  /* 顶部展示 Banner */
  .top-banner {
    padding: 32px 64px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .brand-group {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .brand-logo {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(10, 102, 194, 0.4);
  }
  .brand-title {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #FFFFFF;
  }
  .brand-subtitle {
    font-size: 14px;
    color: #38BDF8;
    font-weight: 500;
  }
  .feature-tags {
    display: flex;
    gap: 12px;
  }
  .tag {
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.25);
    color: #38BDF8;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
  }

  /* 模拟 LinkedIn 发帖弹窗 */
  .mock-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 24px;
    position: relative;
  }
  
  .linkedin-modal {
    width: 760px;
    background: #1B1F23;
    border: 1px solid #30363D;
    border-radius: 14px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.05);
    overflow: hidden;
  }

  .modal-header {
    padding: 16px 24px;
    border-bottom: 1px solid #30363D;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .author-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0A66C2, #004182);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #FFFFFF;
    font-size: 16px;
  }
  .author-details h4 {
    font-size: 15px;
    font-weight: 600;
    color: #F0F6FC;
  }
  .author-details p {
    font-size: 12px;
    color: #8B949E;
  }
  .close-btn {
    color: #8B949E;
    font-size: 20px;
  }

  .editor-body {
    padding: 28px 24px 70px;
    font-size: 18px;
    line-height: 1.7;
    color: #C9D1D9;
    min-height: 220px;
    position: relative;
  }

  .highlight-text {
    background: rgba(10, 102, 194, 0.45);
    color: #FFFFFF;
    padding: 2px 4px;
    border-radius: 3px;
    position: relative;
  }

  /* 悬浮工具栏 */
  .floating-toolbar {
    position: absolute;
    top: 15px;
    left: 200px;
    background: #0B0E14;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 5px 8px;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
  .tool-btn {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: none;
    background: transparent;
    color: #E2E8F0;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  .tool-btn.active {
    background: #0A66C2;
    color: #FFFFFF;
    box-shadow: 0 2px 6px rgba(10, 102, 194, 0.4);
  }
  .tool-divider {
    width: 1px;
    height: 18px;
    background: #334155;
    margin: 0 2px;
  }

  .modal-footer {
    padding: 14px 24px;
    border-top: 1px solid #30363D;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-icons {
    display: flex;
    gap: 16px;
    color: #8B949E;
    font-size: 18px;
  }
  .post-btn {
    background: #0A66C2;
    color: #FFFFFF;
    border: none;
    border-radius: 20px;
    padding: 8px 24px;
    font-size: 14px;
    font-weight: 600;
  }

  /* 底部特点栏 */
  .bottom-cards {
    padding: 0 64px 32px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .b-card {
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(51, 65, 85, 0.5);
    border-radius: 10px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .b-icon {
    font-size: 22px;
  }
  .b-text h5 {
    font-size: 13px;
    font-weight: 700;
    color: #F1F5F9;
  }
  .b-text p {
    font-size: 11px;
    color: #94A3B8;
    margin-top: 2px;
  }
</style>
</head>
<body>
  <div class="top-banner">
    <div class="brand-group">
      <img src="${iconDataUrl}" class="brand-logo" alt="Logo">
      <div>
        <div class="brand-title">InlineFormatter</div>
        <div class="brand-subtitle">Inline Text Formatter for LinkedIn & X</div>
      </div>
    </div>
    <div class="feature-tags">
      <span class="tag">⚡ Zero Latency</span>
      <span class="tag">🔒 100% Local & Private</span>
      <span class="tag">✨ 5 Typography Styles</span>
    </div>
  </div>

  <div class="mock-container">
    <div class="linkedin-modal">
      <div class="modal-header">
        <div class="author-info">
          <div class="avatar">TH</div>
          <div class="author-details">
            <h4>Tianlu (Tyler) HUANG</h4>
            <p>Post to Anyone</p>
          </div>
        </div>
        <div class="close-btn">✕</div>
      </div>
      
      <div class="editor-body">
        <div class="floating-toolbar">
          <button class="tool-btn active">B</button>
          <button class="tool-btn" style="font-style: italic; font-family: serif;">I</button>
          <button class="tool-btn" style="font-weight: 700; font-style: italic; font-family: serif;">B</button>
          <button class="tool-btn" style="font-weight: 800; font-family: sans-serif;">𝗕</button>
          <div class="tool-divider"></div>
          <button class="tool-btn" style="font-size: 12px; font-weight: 700;">Aa</button>
        </div>

        <p>Excited to announce our new milestone today!</p>
        <br>
        <p>Three core lessons we learned when scaling cross-border ventures: <span class="highlight-text">Speed, focus, and relentless execution</span> are the defining factors that separate winners.</p>
        <br>
        <p>What has been your most valuable growth principle this year?</p>
      </div>

      <div class="modal-footer">
        <div class="footer-icons">
          <span>📷</span>
          <span>📅</span>
          <span>📊</span>
          <span>➕</span>
        </div>
        <button class="post-btn">Post</button>
      </div>
    </div>
  </div>

  <div class="bottom-cards">
    <div class="b-card">
      <div class="b-icon">🎯</div>
      <div class="b-text">
        <h5>Select & Format Instantly</h5>
        <p>Floating toolbar appears right above your selection</p>
      </div>
    </div>
    <div class="b-card">
      <div class="b-icon">🔄</div>
      <div class="b-text">
        <h5>Undo & Redo Synchronized</h5>
        <p>Full Cmd+Z / Ctrl+Z support across LinkedIn & X</p>
      </div>
    </div>
    <div class="b-card">
      <div class="b-icon">🛡️</div>
      <div class="b-text">
        <h5>Zero Sensitive Permissions</h5>
        <p>Runs offline in browser with zero tracking or storage</p>
      </div>
    </div>
  </div>
</body>
</html>`;

// 页面 2: 风格对比与排版效果截图 (1280x800)
const html2 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1280px;
    height: 800px;
    background: #0B1120;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #F8FAFC;
    padding: 40px 64px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .header-logo {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    box-shadow: 0 4px 18px rgba(10, 102, 194, 0.45);
  }
  .title-group h1 {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .title-group p {
    font-size: 14px;
    color: #38BDF8;
    margin-top: 2px;
  }
  .badge {
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #34D399;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
  }

  .main-content {
    display: grid;
    grid-template-columns: 1.25fr 0.75fr;
    gap: 32px;
    align-items: center;
  }

  /* 样式卡片列表 */
  .styles-panel {
    background: #1E293B;
    border: 1px solid #334155;
    border-radius: 14px;
    padding: 24px;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4);
  }
  .panel-title {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94A3B8;
    margin-bottom: 16px;
  }
  .style-row {
    background: #0F172A;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 12px 18px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .style-row:last-child {
    margin-bottom: 0;
  }
  .style-meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .style-key {
    width: 30px;
    height: 30px;
    background: #1E293B;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 13px;
    color: #38BDF8;
  }
  .style-label {
    font-size: 13px;
    color: #94A3B8;
  }
  .style-output {
    font-size: 16px;
    color: #F8FAFC;
    font-weight: 500;
  }

  /* 右侧 Popup 预览 */
  .popup-preview-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .popup-card {
    width: 320px;
    background: linear-gradient(180deg, #444B59 0%, #39404E 100%);
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 14px;
    padding: 20px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    color: #FFFFFF;
  }
  .pop-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  .pop-logo {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pop-title h3 {
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;
  }
  .pop-status {
    font-size: 11px;
    color: #67E8F9;
    font-weight: 600;
  }
  .pop-hint {
    background: #2F3542;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 8px;
    padding: 10px;
    font-size: 11px;
    color: #E2E8F0;
    line-height: 1.4;
    margin-bottom: 16px;
  }
  .pop-creator {
    border-top: 1px solid rgba(255, 255, 255, 0.14);
    padding-top: 12px;
  }
  .pop-c-label {
    font-size: 9px;
    text-transform: uppercase;
    color: #A0AEC0;
    font-weight: 700;
  }
  .pop-c-name {
    font-size: 13px;
    font-weight: 700;
    margin-top: 2px;
    color: #FFFFFF;
  }
  .pop-c-title {
    font-size: 11px;
    color: #CBD5E1;
    margin-top: 2px;
  }
  .pop-btn {
    margin-top: 12px;
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    background: #0A66C2;
    color: #fff;
    box-shadow: 0 2px 8px rgba(10, 102, 194, 0.35);
  }
  .pop-btn-sec {
    margin-top: 6px;
    background: #323846;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #FFFFFF;
  }

  .footer-features {
    display: flex;
    justify-content: space-between;
    background: rgba(30, 41, 59, 0.4);
    border: 1px solid rgba(51, 65, 85, 0.4);
    border-radius: 10px;
    padding: 14px 28px;
  }
  .feat-item {
    font-size: 13px;
    color: #94A3B8;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .feat-item strong {
    color: #F1F5F9;
  }
</style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <img src="${iconDataUrl}" class="header-logo" alt="Logo">
      <div class="title-group">
        <h1>Transform Boring Posts into Engaging Highlights</h1>
        <p>Standard Unicode Characters · Renders Flawlessly Across iOS, Android & Desktop</p>
      </div>
    </div>
    <div class="badge">Universal Unicode Standard</div>
  </div>

  <div class="main-content">
    <div class="styles-panel">
      <div class="panel-title">Available Typography Styles</div>
      
      <div class="style-row">
        <div class="style-meta">
          <div class="style-key">B</div>
          <div class="style-label">Serif Bold</div>
        </div>
        <div class="style-output">𝐇𝐞𝐥𝐥𝐨 𝐋𝐢𝐧𝐤𝐞𝐝𝐈𝐧 & 𝐗</div>
      </div>

      <div class="style-row">
        <div class="style-meta">
          <div class="style-key" style="font-style: italic;">I</div>
          <div class="style-label">Serif Italic</div>
        </div>
        <div class="style-output">𝐻𝑒𝑙𝑙𝑜 𝐿𝑖𝑛𝑘𝑒𝑑𝐼𝑛 & 𝑋</div>
      </div>

      <div class="style-row">
        <div class="style-meta">
          <div class="style-key" style="font-style: italic;">B</div>
          <div class="style-label">Serif Bold Italic</div>
        </div>
        <div class="style-output">𝑯𝒆𝒍𝒍𝒐 𝑳𝒊𝒏𝒌𝒆𝒅𝑰𝒏 & 𝑿</div>
      </div>

      <div class="style-row">
        <div class="style-meta">
          <div class="style-key">𝗕</div>
          <div class="style-label">Sans-Serif Bold</div>
        </div>
        <div class="style-output">𝗛𝗲𝗹𝗹𝗼 𝗟𝗶𝗻𝗸𝗲𝗱𝗜𝗻 & 𝗫</div>
      </div>

      <div class="style-row">
        <div class="style-meta">
          <div class="style-key">Aa</div>
          <div class="style-label">One-Click Revert</div>
        </div>
        <div class="style-output" style="color: #94A3B8;">Hello LinkedIn & X</div>
      </div>
    </div>

    <div class="popup-preview-container">
      <div class="popup-card">
        <div class="pop-head">
          <div class="pop-logo">
            <img src="${iconDataUrl}" style="width: 24px; height: 24px;" alt="icon">
          </div>
          <div class="pop-title">
            <h3>InlineFormatter</h3>
            <div class="pop-status">● Active on LinkedIn & X</div>
          </div>
        </div>
        <div class="pop-hint">
          Highlight text on LinkedIn or X (Twitter) to format instantly.
        </div>
        <div class="pop-creator">
          <div class="pop-c-label">Creator & Open Source</div>
          <div class="pop-c-name">Tianlu (Tyler) HUANG</div>
          <div class="pop-c-title">Co-founder & COO @ Transfong | Cross-Border Ventures</div>
          <div class="pop-btn">Connect on LinkedIn</div>
          <div class="pop-btn pop-btn-sec">⭐ Star on GitHub</div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-features">
    <div class="feat-item">🛡️ <strong>Zero Data Collected</strong> (Pure Local Math)</div>
    <div class="feat-item">⌨️ <strong>Native Undo/Redo</strong> (Cmd+Z / Ctrl+Z)</div>
    <div class="feat-item">📦 <strong>Ultra-Lightweight</strong> (~35KB Vanilla ES6+)</div>
    <div class="feat-item">🔓 <strong>100% Free & Open Source</strong> (MIT)</div>
  </div>
</body>
</html>`;

// 页面 3: 官方推荐位小横幅 (440x280)
const html3 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 440px;
    height: 280px;
    background: radial-gradient(circle at top right, #1E293B, #0B0F19);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #F8FAFC;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .accent-glow {
    position: absolute;
    width: 220px;
    height: 220px;
    background: rgba(10, 102, 194, 0.25);
    filter: blur(50px);
    border-radius: 50%;
    top: -50px;
    right: -50px;
    pointer-events: none;
  }

  .promo-logo {
    width: 64px;
    height: 64px;
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(10, 102, 194, 0.45);
    margin-bottom: 14px;
  }

  h1 {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #FFFFFF;
    margin-bottom: 6px;
  }

  p {
    font-size: 12px;
    color: #94A3B8;
    line-height: 1.4;
    max-width: 320px;
    margin-bottom: 14px;
  }

  .promo-tags {
    display: flex;
    gap: 8px;
    justify-content: center;
  }

  .p-tag {
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.3);
    color: #38BDF8;
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 700;
  }
</style>
</head>
<body>
  <div class="accent-glow"></div>
  <img src="${iconDataUrl}" class="promo-logo" alt="Logo">
  <h1>InlineFormatter</h1>
  <p>Inline Text Formatter for LinkedIn & X. 100% Free & Zero Permissions.</p>
  <div class="promo-tags">
    <span class="p-tag">𝐁𝐨𝐥𝐝</span>
    <span class="p-tag">𝐼𝑡𝑎𝑙𝑖𝑐</span>
    <span class="p-tag">𝗕𝗼𝗹𝗱</span>
    <span class="p-tag">Aa Revert</span>
  </div>
</body>
</html>`;

const tempDir = path.join(rootDir, 'scripts', 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

fs.writeFileSync(path.join(tempDir, 'screen1.html'), html1);
fs.writeFileSync(path.join(tempDir, 'screen2.html'), html2);
fs.writeFileSync(path.join(tempDir, 'promo.html'), html3);

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const runScreenshot = (htmlFile, outFile, width, height) => {
  const fileUrl = `file://${htmlFile}`;
  const cmd = `"${chromePath}" --headless --disable-gpu --screenshot="${outFile}" --window-size=${width},${height} "${fileUrl}"`;
  console.log(`Generating: ${path.basename(outFile)} (${width}x${height})...`);
  execSync(cmd, { stdio: 'inherit' });
};

runScreenshot(
  path.join(tempDir, 'screen1.html'),
  path.join(assetsDir, 'screenshot-1-toolbar.png'),
  1280,
  800
);
fs.copyFileSync(path.join(assetsDir, 'screenshot-1-toolbar.png'), path.join(assetsDir, 'screenshot-1.png'));

runScreenshot(
  path.join(tempDir, 'screen2.html'),
  path.join(assetsDir, 'screenshot-2-styles.png'),
  1280,
  800
);
fs.copyFileSync(path.join(assetsDir, 'screenshot-2-styles.png'), path.join(assetsDir, 'screenshot-2.png'));

runScreenshot(
  path.join(tempDir, 'promo.html'),
  path.join(assetsDir, 'promo-tile-440x280.png'),
  440,
  280
);

// 清理临时 html
fs.rmSync(tempDir, { recursive: true, force: true });

// 自动同步最新图片至 iCloud 商店素材目录
const icloudDir = '/Users/tylerh/Library/Mobile Documents/com~apple~CloudDocs/Formatly_Store_Assets';
if (fs.existsSync(icloudDir)) {
  fs.copyFileSync(path.join(assetsDir, 'screenshot-1.png'), path.join(icloudDir, 'screenshot-1.png'));
  fs.copyFileSync(path.join(assetsDir, 'screenshot-1-toolbar.png'), path.join(icloudDir, 'screenshot-1-toolbar.png'));
  fs.copyFileSync(path.join(assetsDir, 'screenshot-2.png'), path.join(icloudDir, 'screenshot-2.png'));
  fs.copyFileSync(path.join(assetsDir, 'screenshot-2-styles.png'), path.join(icloudDir, 'screenshot-2-styles.png'));
  fs.copyFileSync(path.join(assetsDir, 'promo-tile-440x280.png'), path.join(icloudDir, 'promo-tile-440x280.png'));
  console.log('☁️ Synced all screenshots & promo tile to iCloud Store Assets directory.');
}

console.log('✓ All visual assets generated successfully in store-assets/ and synced to iCloud.');
