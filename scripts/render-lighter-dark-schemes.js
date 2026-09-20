const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const conceptsDir = path.join(rootDir, 'icons', 'concepts');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const iconAaBase64 = fs.readFileSync(path.join(rootDir, 'icons', 'icon-48.png')).toString('base64');
const iconDataUrl = `data:image/png;base64,${iconAaBase64}`;

// 3 款真正「不要太黑」、明度提升（L ≈ 22% ~ 32%）的高级深色调
const schemes = [
  {
    id: '1',
    name: '方案 1: 经典极简石墨蓝灰 (Graphite Slate)',
    tag: '温润北欧蓝灰 · 明度 L≈24%',
    desc: '彻底告别死黑压迫。温润的石墨深蓝灰，在白底网页中像精致悬浮的名片，在黑底中清爽透亮。',
    bodyBg: 'linear-gradient(180deg, #2E3646 0%, #252D3C 100%)',
    bodyBorder: '1px solid rgba(255, 255, 255, 0.2)',
    bodyShadow: '0 20px 48px -10px rgba(15, 23, 42, 0.32), 0 2px 8px rgba(0, 0, 0, 0.1)',
    cardBg: '#212735',
    cardBorder: '1px solid rgba(255, 255, 255, 0.12)',
    textPrimary: '#FFFFFF',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    accentText: '#38BDF8',
    badgeBg: 'rgba(56, 189, 248, 0.18)',
    badgeBorder: '1px solid rgba(56, 189, 248, 0.35)',
    btnSecBg: '#283040',
    btnSecBorder: '1px solid rgba(255, 255, 255, 0.18)',
    btnSecText: '#FFFFFF',
  },
  {
    id: '2',
    name: '方案 2: 轻奢烟熏钛金灰 (Smoky Titanium)',
    tag: '纯正中性钛金属 · 明度 L≈27%',
    desc: '纯中性高级钛金烟熏灰，完全摆脱黑漆沉重感。边缘有金属微反射光，克制、高级、不伤眼。',
    bodyBg: 'linear-gradient(180deg, #383E4B 0%, #2F3440 100%)',
    bodyBorder: '1px solid rgba(255, 255, 255, 0.22)',
    bodyShadow: '0 20px 48px -10px rgba(0, 0, 0, 0.28), 0 2px 8px rgba(0, 0, 0, 0.08)',
    cardBg: '#272B35',
    cardBorder: '1px solid rgba(255, 255, 255, 0.14)',
    textPrimary: '#FFFFFF',
    textSecondary: '#D1D5DB',
    textMuted: '#9CA3AF',
    accentText: '#38BDF8',
    badgeBg: 'rgba(255, 255, 255, 0.12)',
    badgeBorder: '1px solid rgba(255, 255, 255, 0.22)',
    btnSecBg: '#323743',
    btnSecBorder: '1px solid rgba(255, 255, 255, 0.2)',
    btnSecText: '#FFFFFF',
  },
  {
    id: '3',
    name: '方案 3: 雅致微光太空灰 (Space Gray / Soft Charcoal)',
    tag: '苹果经典太空灰 · 明度 L≈31%',
    desc: '明度最舒展的一款。中深灰度如细腻磨砂铝合金，在白底网页中反差极其温和舒缓，长时间注视不疲劳。',
    bodyBg: 'linear-gradient(180deg, #444B59 0%, #39404E 100%)',
    bodyBorder: '1px solid rgba(255, 255, 255, 0.25)',
    bodyShadow: '0 22px 50px -10px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.06)',
    cardBg: '#2F3542',
    cardBorder: '1px solid rgba(255, 255, 255, 0.15)',
    textPrimary: '#FFFFFF',
    textSecondary: '#E2E8F0',
    textMuted: '#A0AEC0',
    accentText: '#67E8F9',
    badgeBg: 'rgba(103, 232, 249, 0.18)',
    badgeBorder: '1px solid rgba(103, 232, 249, 0.35)',
    btnSecBg: '#3A4150',
    btnSecBorder: '1px solid rgba(255, 255, 255, 0.22)',
    btnSecText: '#FFFFFF',
  }
];

function renderPopupCardHtml(s) {
  return `
    <div style="
      width: 290px;
      padding: 18px;
      background: ${s.bodyBg};
      border-radius: 14px;
      border: ${s.bodyBorder};
      box-shadow: ${s.bodyShadow};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: ${s.textPrimary};
      box-sizing: border-box;
    ">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
        <div style="width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center;">
          <img src="${iconDataUrl}" style="width: 100%; height: 100%; border-radius: 9px;" alt="Logo">
        </div>
        <div>
          <div style="font-size: 14px; font-weight: 700; color: ${s.textPrimary}; letter-spacing: -0.01em;">Formatly for LinkedIn</div>
          <div style="display: inline-flex; align-items: center; gap: 5px; margin-top: 3px; font-size: 11px; color: ${s.accentText}; background: ${s.badgeBg}; padding: 2px 8px; border-radius: 12px; border: ${s.badgeBorder}; font-weight: 600;">
            <span style="width: 6px; height: 6px; background: ${s.accentText}; border-radius: 50%; box-shadow: 0 0 6px ${s.accentText};"></span>
            <span>Active on LinkedIn</span>
          </div>
        </div>
      </div>

      <div style="background: ${s.cardBg}; border: ${s.cardBorder}; border-radius: 8px; padding: 10px 12px; font-size: 11px; line-height: 1.5; color: ${s.textSecondary}; margin-bottom: 14px;">
        💡 <strong style="color: ${s.textPrimary}; font-weight: 700;">How to use:</strong> Highlight any text inside LinkedIn's post composer.
      </div>

      <div style="border-top: ${s.cardBorder}; padding-top: 12px;">
        <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: ${s.textMuted}; margin-bottom: 5px; font-weight: 700;">Creator & Open Source</div>
        <div style="font-size: 13px; font-weight: 700; color: ${s.textPrimary};">Tianlu (Tyler) HUANG</div>
        <div style="font-size: 11px; color: ${s.textSecondary}; margin-top: 2px; line-height: 1.35;">Co-founder & COO @ Transfong</div>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
          <div style="display: flex; align-items: center; justify-content: center; width: 100%; padding: 8px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; background: #0A66C2; color: #FFFFFF; box-shadow: 0 2px 8px rgba(10, 102, 194, 0.35); box-sizing: border-box;">
            Connect on LinkedIn
          </div>
          <div style="display: flex; align-items: center; justify-content: center; width: 100%; padding: 8px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; background: ${s.btnSecBg}; border: ${s.btnSecBorder}; color: ${s.btnSecText}; box-sizing: border-box;">
            ⭐ Star on GitHub
          </div>
        </div>
      </div>

      <div style="font-size: 10px; color: ${s.textMuted}; text-align: center; margin-top: 12px; font-weight: 500;">
        100% Free · Zero Data · LinkedIn Only
      </div>
    </div>
  `;
}

const boardHtml = `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1800px;
    height: 1260px;
    background: #11141A;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #F8FAFC;
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 20px;
    border-bottom: 1px solid #2A303C;
  }
  .header h1 {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #FFFFFF;
  }
  .header p {
    font-size: 15px;
    color: #38BDF8;
    margin-top: 4px;
  }
  .header-badge {
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.3);
    color: #38BDF8;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
  }

  .section-title {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #94A3B8;
    margin: 16px 0 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .section-title span {
    font-size: 12px;
    font-weight: 500;
    color: #64748B;
    text-transform: none;
  }

  /* 模拟白色网页背景 */
  .light-surface {
    background: #FFFFFF;
    background-image: radial-gradient(#E2E8F0 1.5px, transparent 1.5px);
    background-size: 24px 24px;
    border: 1px solid #CBD5E1;
    border-radius: 16px;
    padding: 24px 32px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  }

  /* 模拟深色网页背景 */
  .dark-surface {
    background: #0F172A;
    background-image: radial-gradient(#1E293B 1.5px, transparent 1.5px);
    background-size: 24px 24px;
    border: 1px solid #1E293B;
    border-radius: 16px;
    padding: 24px 32px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .col-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .light-label {
    font-size: 14px;
    font-weight: 700;
    color: #334155;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .dark-label {
    font-size: 14px;
    font-weight: 700;
    color: #E2E8F0;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 14px;
    border-top: 1px solid #2A303C;
    font-size: 13px;
    color: #94A3B8;
  }
</style>
</head>
<body>
  <div class="header">
    <div>
      <h1>Formatly 弹窗「非死黑·中度高级深色调」对比看板 (3 种备选)</h1>
      <p>明度大幅提升至 22%~31%，彻底消除大黑底生硬感，在白底网页中舒缓温润，在黑底网页中层次分明</p>
    </div>
    <div class="header-badge">明度大幅提升 (L=22%~31%)</div>
  </div>

  <!-- 1. 在浅色主题 (白色背景) 网页下的实机视觉效果 -->
  <div class="section-title">
    ☀️ 场景一：在【浅色网页 (白色主页)】下的悬浮效果
    <span>（请观察：告别大黑色压迫，像一块温润优雅的高级名片卡）</span>
  </div>
  <div class="light-surface">
    <div class="col-box">
      <div class="light-label">🔵 方案 1: 石墨蓝灰 (L≈24%)</div>
      ${renderPopupCardHtml(schemes[0])}
    </div>
    <div class="col-box">
      <div class="light-label">🔘 方案 2: 烟熏钛金 (L≈27%)</div>
      ${renderPopupCardHtml(schemes[1])}
    </div>
    <div class="col-box">
      <div class="light-label">⚪ 方案 3: 太空灰 (L≈31%)</div>
      ${renderPopupCardHtml(schemes[2])}
    </div>
  </div>

  <!-- 2. 在深色主题 (暗黑背景) 网页下的实机视觉效果 -->
  <div class="section-title">
    🌙 场景二：在【深色网页 (暗黑模式)】下的悬浮效果
    <span>（请观察：相比背景更亮更有层次，绝不被黑色吞没）</span>
  </div>
  <div class="dark-surface">
    <div class="col-box">
      <div class="dark-label">🔵 方案 1: 石墨蓝灰 (在暗黑底)</div>
      ${renderPopupCardHtml(schemes[0])}
    </div>
    <div class="col-box">
      <div class="dark-label">🔘 方案 2: 烟熏钛金 (在暗黑底)</div>
      ${renderPopupCardHtml(schemes[1])}
    </div>
    <div class="col-box">
      <div class="dark-label">⚪ 方案 3: 太空灰 (在暗黑底)</div>
      ${renderPopupCardHtml(schemes[2])}
    </div>
  </div>

  <div class="footer">
    <div><strong>方案 1 (石墨蓝灰)</strong>：微蓝深灰，现代北欧精英气质，温润适中</div>
    <div><strong>方案 2 (烟熏钛金)</strong>：纯正中性钛金属色，高贵不偏色，漫反射柔光</div>
    <div><strong>方案 3 (太空灰)</strong>：明度最高最柔和，长时间注视最护眼，黑白通吃</div>
  </div>
</body>
</html>`;

const tmp = path.join(__dirname, 'temp-lighter-board.html');
fs.writeFileSync(tmp, boardHtml);
const out = path.join(conceptsDir, 'lighter-dark-schemes.png');
console.log('Rendering lighter dark schemes comparison board...');
execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${out}" --window-size=1800,1260 "file://${tmp}"`, { stdio: 'ignore' });
if (fs.existsSync(tmp)) fs.unlinkSync(tmp);

console.log('✓ Rendered lighter dark schemes comparison to: ' + out);
