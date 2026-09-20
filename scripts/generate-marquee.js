const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const assetsDir = path.join(rootDir, 'store-assets');
const icloudDir = '/Users/tylerh/Library/Mobile Documents/com~apple~CloudDocs/Formatly_Store_Assets';

// 读取 128 图标转为 base64
const icon128Base64 = fs.readFileSync(path.join(rootDir, 'icons', 'icon-128.png')).toString('base64');
const iconDataUrl = `data:image/png;base64,${icon128Base64}`;

const marqueeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1400px;
    height: 560px;
    background: #0B0F19; /* Solid background - 24-bit no alpha compliant */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #F8FAFC;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 88px;
  }
  
  /* Ambient lighting */
  .bg-glow-1 {
    position: absolute;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(10, 102, 194, 0.28) 0%, rgba(10, 102, 194, 0) 70%);
    top: -200px;
    left: 40px;
    pointer-events: none;
  }
  .bg-glow-2 {
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(56, 189, 248, 0) 70%);
    bottom: -180px;
    right: 80px;
    pointer-events: none;
  }

  /* Left column - Branding & Value Proposition */
  .left-col {
    max-width: 550px;
    z-index: 2;
  }
  .brand-row {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 24px;
  }
  .brand-icon {
    width: 76px;
    height: 76px;
    border-radius: 18px;
    box-shadow: 0 12px 32px rgba(10, 102, 194, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.18);
  }
  .brand-text-block {
    display: flex;
    flex-direction: column;
  }
  .brand-name {
    font-size: 36px;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: #FFFFFF;
    line-height: 1.1;
  }
  .brand-name .in-accent {
    color: #38BDF8;
  }
  .brand-badge {
    font-size: 13px;
    font-weight: 700;
    color: #38BDF8;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 6px;
  }

  .headline {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.35;
    color: #E2E8F0;
    margin-bottom: 16px;
  }
  .headline span {
    color: #38BDF8;
  }

  .desc {
    font-size: 15px;
    line-height: 1.6;
    color: #94A3B8;
    margin-bottom: 28px;
  }

  .pills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .pill-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #CBD5E1;
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 9px 14px;
    border-radius: 8px;
    font-weight: 500;
  }
  .pill-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #38BDF8;
  }

  /* Right column - Clean mock LinkedIn UI */
  .right-col {
    position: relative;
    z-index: 2;
    width: 610px;
  }

  .mock-card {
    background: #1B1F23;
    border: 1px solid #30363D;
    border-radius: 16px;
    padding: 24px 26px;
    box-shadow: 0 28px 64px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08);
    position: relative;
  }

  .mock-author {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  .author-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0A66C2, #38BDF8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 16px;
    color: #FFFFFF;
  }
  .author-meta h4 {
    font-size: 15px;
    font-weight: 700;
    color: #F0F6FC;
  }
  .author-meta p {
    font-size: 12px;
    color: #8B949E;
  }

  .composer-body {
    position: relative;
    padding-top: 44px;
  }

  /* Floating toolbar simulation (Space Gray Theme) */
  .floating-bar {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, #444B59 0%, #39404E 100%);
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 8px;
    padding: 6px 10px;
    display: flex;
    gap: 6px;
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(0,0,0,0.35);
    z-index: 10;
  }
  .bar-btn {
    padding: 5px 11px;
    border-radius: 5px;
    font-size: 13px;
    font-weight: 700;
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
  .bar-btn.active {
    background: #0A66C2;
    border-color: #38BDF8;
    color: #FFFFFF;
  }

  .editor-content {
    font-size: 16px;
    line-height: 1.65;
    color: #E6EDF3;
    padding: 6px 0 12px;
  }
  .highlight-span {
    background: rgba(10, 102, 194, 0.38);
    border-radius: 3px;
    padding: 3px 6px;
    border-bottom: 2px solid #38BDF8;
    color: #FFFFFF;
  }

  /* Style examples showcase below editor */
  .style-strip {
    display: flex;
    gap: 8px;
    margin-top: 14px;
    padding-top: 16px;
    border-top: 1px solid #30363D;
  }
  .style-chip {
    flex: 1;
    background: #0D1117;
    border: 1px solid #30363D;
    border-radius: 8px;
    padding: 8px 6px;
    text-align: center;
  }
  .chip-label {
    font-size: 10px;
    color: #8B949E;
    text-transform: uppercase;
    margin-bottom: 2px;
    font-weight: 600;
  }
  .chip-val {
    font-size: 13px;
    font-weight: 700;
    color: #58A6FF;
  }
</style>
</head>
<body>
  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>

  <!-- Left: Value Proposition -->
  <div class="left-col">
    <div class="brand-row">
      <img src="${iconDataUrl}" class="brand-icon" alt="Formatly Icon">
      <div class="brand-text-block">
        <h1 class="brand-name">Formatly for Linked<span class="in-accent">In</span></h1>
        <div class="brand-badge">Inline Typography Extension</div>
      </div>
    </div>

    <div class="headline">
      Format posts and comments with <span>bold, italic & styles</span> — instantly.
    </div>

    <div class="desc">
      Stop switching tabs to copy-paste. Select any text inside LinkedIn to format with native Unicode typography and seamless undo history.
    </div>

    <div class="pills-grid">
      <div class="pill-item">
        <div class="pill-dot"></div>
        <span>Strictly Scoped: *.linkedin.com</span>
      </div>
      <div class="pill-item">
        <div class="pill-dot"></div>
        <span>Universal Unicode Output</span>
      </div>
      <div class="pill-item">
        <div class="pill-dot"></div>
        <span>Full Cmd+Z / Ctrl+Z Undo</span>
      </div>
      <div class="pill-item">
        <div class="pill-dot"></div>
        <span>Zero Permissions & 100% Local</span>
      </div>
    </div>
  </div>

  <!-- Right: Floating Toolbar UI Demo -->
  <div class="right-col">
    <div class="mock-card">
      <div class="mock-author">
        <div class="author-avatar">TH</div>
        <div class="author-meta">
          <h4>Tianlu (Tyler) HUANG</h4>
          <p>Founder & Creator • Just now • Public</p>
        </div>
      </div>

      <div class="composer-body">
        <!-- Floating Toolbar Positioned Above Selected Text -->
        <div class="floating-bar">
          <div class="bar-btn active">𝐁 Bold</div>
          <div class="bar-btn">𝐼 Italic</div>
          <div class="bar-btn">𝑩𝑰 Bold Italic</div>
          <div class="bar-btn">𝗕 Sans</div>
          <div class="bar-btn">Aa Revert</div>
        </div>

        <div class="editor-content">
          Highlight any text to format your LinkedIn post:<br>
          <span class="highlight-span">Professional typography directly inside LinkedIn.</span>
        </div>
      </div>

      <div class="style-strip">
        <div class="style-chip">
          <div class="chip-label">Serif Bold</div>
          <div class="chip-val">𝐁𝐨𝐥𝐝 𝐏𝐨𝐬𝐭</div>
        </div>
        <div class="style-chip">
          <div class="chip-label">Serif Italic</div>
          <div class="chip-val">𝐼𝑡𝑎𝑙𝑖𝑐 𝐓𝐞𝐱𝐭</div>
        </div>
        <div class="style-chip">
          <div class="chip-label">Bold Italic</div>
          <div class="chip-val">𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄</div>
        </div>
        <div class="style-chip">
          <div class="chip-label">Sans Bold</div>
          <div class="chip-val">𝗕𝗼𝗹𝗱 𝗛𝗲𝗮𝗱</div>
        </div>
        <div class="style-chip">
          <div class="chip-label">Plain Text</div>
          <div class="chip-val" style="color: #94A3B8;">Aa Revert</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

const tempDir = path.join(rootDir, 'scripts', 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const htmlPath = path.join(tempDir, 'marquee.html');
fs.writeFileSync(htmlPath, marqueeHtml);

const pngOut = path.join(assetsDir, 'marquee-promo-1400x560.png');
const jpgOut = path.join(assetsDir, 'marquee-promo-1400x560.jpg');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

console.log('Rendering Marquee Promo Tile (1400x560)...');
execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${pngOut}" --window-size=1400,560 "file://${htmlPath}"`, {
  stdio: 'inherit'
});

// Convert to JPEG as well
execSync(`sips -s format jpeg -s formatOptions 95 "${pngOut}" --out "${jpgOut}"`, { stdio: 'inherit' });

// Also copy to iCloud folder
if (fs.existsSync(icloudDir)) {
  fs.copyFileSync(pngOut, path.join(icloudDir, 'marquee-promo-1400x560.png'));
  fs.copyFileSync(jpgOut, path.join(icloudDir, 'marquee-promo-1400x560.jpg'));
  console.log('Copied to iCloud folder:', path.join(icloudDir, 'marquee-promo-1400x560.png'));
  console.log('Copied to iCloud folder:', path.join(icloudDir, 'marquee-promo-1400x560.jpg'));
}

// Clean up
fs.rmSync(tempDir, { recursive: true, force: true });
console.log('✓ Marquee Promo Tile created successfully.');
