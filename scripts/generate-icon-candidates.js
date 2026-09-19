const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const conceptsDir = path.join(rootDir, 'icons', 'concepts');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// 方案 1: 经典排版大师款 (concept-aa.svg，已存在)
// 包含: 经典衬线 A + 斜体 a + 底部彩色发光基线 + 顶部星芒
const svg1Path = path.join(conceptsDir, 'concept-aa.svg');
const svg1Content = fs.readFileSync(svg1Path, 'utf8');

// 方案 2: 硬朗几何切角款 (icon-aa.svg)
const svg2Path = path.join(rootDir, 'icons', 'icon-aa.svg');
const svg2Content = fs.readFileSync(svg2Path, 'utf8');

// 方案 3: 现代无衬线高能极简款 (Modern Sans Aa)
const svg3Content = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgS3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090D1A"/>
      <stop offset="60%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="cyanBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <linearGradient id="pureWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <linearGradient id="glowRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#6366F1" stop-opacity="0.6"/>
    </linearGradient>
    <filter id="shadowS3" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.85"/>
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#0284C7" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect x="20" y="20" width="472" height="472" rx="112" fill="url(#bgS3)"/>
  <rect x="21" y="21" width="470" height="470" rx="111" fill="none" stroke="url(#glowRim)" stroke-width="3"/>
  <g filter="url(#shadowS3)">
    <text x="80" y="380" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif" font-size="330" font-weight="900" fill="url(#pureWhiteGrad)" letter-spacing="-0.06em">A</text>
    <text x="280" y="380" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif" font-size="280" font-weight="900" font-style="italic" fill="url(#cyanBlueGrad)">a</text>
  </g>
  <circle cx="430" cy="110" r="16" fill="#38BDF8" filter="blur(2px)"/>
  <circle cx="430" cy="110" r="8" fill="#FFFFFF"/>
</svg>`;
fs.writeFileSync(path.join(conceptsDir, 'concept-aa-sans.svg'), svg3Content);

// 方案 4: 领英经典蓝底白字款 (LinkedIn Classic Blue Aa)
const svg4Content = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgLiBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A66C2"/>
      <stop offset="50%" stop-color="#004E98"/>
      <stop offset="100%" stop-color="#002D59"/>
    </linearGradient>
    <linearGradient id="glowLi" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
    <filter id="shadowLi" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect x="20" y="20" width="472" height="472" rx="112" fill="url(#bgLiBlue)"/>
  <rect x="21" y="21" width="470" height="470" rx="111" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2.5"/>
  <g filter="url(#shadowLi)">
    <text x="76" y="375" font-family="'New York', 'Didot', 'Georgia', serif" font-size="310" font-weight="900" fill="#FFFFFF">A</text>
    <text x="256" y="375" font-family="'New York', 'Baskerville', 'Georgia', serif" font-size="270" font-weight="700" font-style="italic" fill="url(#glowLi)">a</text>
  </g>
  <path d="M 96 410 L 416 410" stroke="url(#glowLi)" stroke-width="8" stroke-linecap="round" filter="url(#shadowLi)"/>
  <path d="M 406 106 Q 406 130, 430 130 Q 406 130, 406 154 Q 406 130, 382 130 Q 406 130, 406 106 Z" fill="#FFFFFF"/>
</svg>`;
fs.writeFileSync(path.join(conceptsDir, 'concept-aa-liblue.svg'), svg4Content);

// 分别渲染 512x512 PNG
const list = [
  { id: '1', name: 'option-1-classic-baseline', svg: svg1Content, title: '方案 1: 经典排版大师 (黑底+彩色发光基线)' },
  { id: '2', name: 'option-2-geometric-crosshair', svg: svg2Content, title: '方案 2: 几何切角纯矢量 (十字准星线)' },
  { id: '3', name: 'option-3-modern-sans', svg: svg3Content, title: '方案 3: 现代高能无衬线 (Sans-Serif 粗斜双体)' },
  { id: '4', name: 'option-4-linkedin-blue', svg: svg4Content, title: '方案 4: 领英经典蓝底款 (官方蓝+高光基线)' }
];

for (const item of list) {
  const tmp = path.join(__dirname, `temp-${item.id}.html`);
  fs.writeFileSync(tmp, `<!DOCTYPE html><html><body style="margin:0;overflow:hidden;background:transparent;">${item.svg}</body></html>`);
  const out = path.join(conceptsDir, `${item.name}.png`);
  execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${out}" --window-size=512,512 --default-background-color=00000000 "file://${tmp}"`, { stdio: 'ignore' });
  if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
}

// 制作 4 合 1 的大型高清对比看板 (1600x900)
const boardHtml = `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1600px;
    height: 900px;
    background: #0B0F19;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #F8FAFC;
    padding: 60px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .header h1 {
    font-size: 34px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #FFFFFF;
  }
  .header p {
    font-size: 16px;
    color: #38BDF8;
    margin-top: 6px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 36px;
    margin-top: 30px;
  }
  .card {
    background: #131B2E;
    border: 1px solid #1E293B;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 12px 32px rgba(0,0,0,0.4);
    transition: all 0.2s ease;
  }
  .card-badge {
    align-self: flex-start;
    font-size: 12px;
    font-weight: 700;
    color: #38BDF8;
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.25);
    padding: 4px 10px;
    border-radius: 6px;
    margin-bottom: 18px;
  }
  .card img {
    width: 220px;
    height: 220px;
    border-radius: 52px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.5);
  }
  .card-title {
    font-size: 18px;
    font-weight: 700;
    color: #F1F5F9;
    margin-top: 22px;
    text-align: center;
  }
  .card-desc {
    font-size: 13px;
    color: #94A3B8;
    text-align: center;
    line-height: 1.5;
    margin-top: 8px;
  }
  .footer-note {
    text-align: center;
    font-size: 14px;
    color: #64748B;
  }
</style>
</head>
<body>
  <div class="header">
    <h1>Formatly for LinkedIn — 官方图标候选方案看板</h1>
    <p>全部方案均以「Aa (加粗 A + 斜体 a)」为排版核心视觉，请现场挑选您的最终确认款</p>
  </div>

  <div class="grid">
    <div class="card">
      <div class="card-badge">方案 1 · 经典推荐</div>
      <img src="file://${path.join(conceptsDir, 'option-1-classic-baseline.png')}">
      <div class="card-title">经典排版大师款</div>
      <div class="card-desc">黑夜底色 · 经典白银衬线 A + 极光青斜体 a · 底部七彩渐变发光基线 · 右上星芒</div>
    </div>

    <div class="card">
      <div class="card-badge">方案 2 · 几何硬朗</div>
      <img src="file://${path.join(conceptsDir, 'option-2-geometric-crosshair.png')}">
      <div class="card-title">硬朗几何切角款</div>
      <div class="card-desc">纯几何 Path 手绘切角 · 背景排版十字准星线 · 极具现代科技感</div>
    </div>

    <div class="card">
      <div class="card-badge">方案 3 · 无衬线先锋</div>
      <img src="file://${path.join(conceptsDir, 'option-3-modern-sans.png')}">
      <div class="card-title">现代高能无衬线款</div>
      <div class="card-desc">无衬线重磅粗体 A + 极速倾角 a · 极光青双核发光圆点 · 干净扁平</div>
    </div>

    <div class="card">
      <div class="card-badge">方案 4 · 领英蓝官方感</div>
      <img src="file://${path.join(conceptsDir, 'option-4-linkedin-blue.png')}">
      <div class="card-title">领英经典蓝底款</div>
      <div class="card-desc">LinkedIn 官方品牌蓝渐变底色 · 高亮衬线 Aa · 极光白光芒基线</div>
    </div>
  </div>

  <div class="footer-note">
    Formatly for LinkedIn (v1.0.0) · 现场挑选后立即一键应用并推送到 GitHub
  </div>
</body>
</html>`;

const boardTmp = path.join(__dirname, 'board-temp.html');
fs.writeFileSync(boardTmp, boardHtml);
const boardOut = path.join(conceptsDir, 'aa-comparison-board.png');
execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${boardOut}" --window-size=1600,900 "file://${boardTmp}"`, { stdio: 'ignore' });
if (fs.existsSync(boardTmp)) fs.unlinkSync(boardTmp);

console.log('✓ All 4 options and comparison board generated in icons/concepts/');
