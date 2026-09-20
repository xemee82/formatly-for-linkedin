const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const conceptsDir = path.join(rootDir, 'icons', 'concepts');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// 读取当前官方 Aa 图标作为 base64
const iconAaBase64 = fs.readFileSync(path.join(rootDir, 'icons', 'icon-48.png')).toString('base64');
const iconDataUrl = `data:image/png;base64,${iconAaBase64}`;

// 定义 3 种配色的 CSS 变量
const schemes = [
  {
    id: 'A',
    name: '方案 A: 冷杉深岩蓝灰 (Slate Navy / Deep Obsidian)',
    tag: '强烈推荐 · 科技精英感',
    desc: '低饱和度岩石墨蓝底，消除纯黑压迫感；白银标题与冰川青点缀，白底与黑底均极具悬浮质感。',
    bodyBg: 'linear-gradient(180deg, #131826 0%, #171F34 100%)',
    bodyBorder: '1px solid rgba(255, 255, 255, 0.12)',
    bodyShadow: '0 18px 40px -6px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(56, 189, 248, 0.1)',
    cardBg: '#1C253B',
    cardBorder: '1px solid rgba(148, 163, 184, 0.18)',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    accentText: '#38BDF8',
    badgeBg: 'rgba(56, 189, 248, 0.12)',
    badgeBorder: '1px solid rgba(56, 189, 248, 0.25)',
    btnSecBg: '#1E283F',
    btnSecBorder: '1px solid #334155',
    btnSecText: '#E2E8F0',
  },
  {
    id: 'B',
    name: '方案 B: 午夜墨玉黛蓝 (Midnight Indigo / Cyber Slate)',
    tag: '优雅奢华 · 极光微光流线',
    desc: '深邃午夜蓝微紫冷调，呼应 Aa 图标极光色彩；微光渐变勾边，温润如黑曜石玻璃卡片。',
    bodyBg: 'linear-gradient(180deg, #16192E 0%, #1B1E38 100%)',
    bodyBorder: '1px solid rgba(129, 140, 248, 0.25)',
    bodyShadow: '0 20px 42px -8px rgba(10, 15, 35, 0.52), 0 0 20px rgba(99, 102, 241, 0.15)',
    cardBg: '#212546',
    cardBorder: '1px solid rgba(99, 102, 241, 0.25)',
    textPrimary: '#FFFFFF',
    textSecondary: '#A5B4FC',
    textMuted: '#6B7280',
    accentText: '#818CF8',
    badgeBg: 'rgba(129, 140, 248, 0.12)',
    badgeBorder: '1px solid rgba(129, 140, 248, 0.3)',
    btnSecBg: '#24284D',
    btnSecBorder: '1px solid #3730A3',
    btnSecText: '#E0E7FF',
  },
  {
    id: 'C',
    name: '方案 C: 烟熏钛灰雾面 (Smoky Titanium / Muted Charcoal)',
    tag: '中性极简 · 原生质感',
    desc: '完全中性无色偏深钛金灰，柔和漫反射阴影；纯净领英蓝点缀，在任何底色上都极致自洽。',
    bodyBg: 'linear-gradient(180deg, #1E222A 0%, #242833 100%)',
    bodyBorder: '1px solid rgba(255, 255, 255, 0.14)',
    bodyShadow: '0 20px 42px -10px rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    cardBg: '#2B303C',
    cardBorder: '1px solid rgba(255, 255, 255, 0.12)',
    textPrimary: '#F8FAFC',
    textSecondary: '#A1A1AA',
    textMuted: '#71717A',
    accentText: '#38BDF8',
    badgeBg: 'rgba(255, 255, 255, 0.08)',
    badgeBorder: '1px solid rgba(255, 255, 255, 0.15)',
    btnSecBg: '#303643',
    btnSecBorder: '1px solid #475569',
    btnSecText: '#F1F5F9',
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
      backdrop-filter: blur(16px);
    ">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
        <div style="width: 36px; height: 36px; border-radius: 9px; background: transparent; display: flex; align-items: center; justify-content: center;">
          <img src="${iconDataUrl}" style="width: 100%; height: 100%; border-radius: 9px;" alt="Logo">
        </div>
        <div>
          <div style="font-size: 14px; font-weight: 700; color: ${s.textPrimary}; letter-spacing: -0.01em;">Formatly for LinkedIn</div>
          <div style="display: inline-flex; align-items: center; gap: 5px; margin-top: 3px; font-size: 11px; color: ${s.accentText}; background: ${s.badgeBg}; padding: 2px 8px; border-radius: 12px; border: ${s.badgeBorder};">
            <span style="width: 6px; height: 6px; background: ${s.accentText}; border-radius: 50%; box-shadow: 0 0 6px ${s.accentText};"></span>
            <span>Active on LinkedIn</span>
          </div>
        </div>
      </div>

      <div style="background: ${s.cardBg}; border: ${s.cardBorder}; border-radius: 8px; padding: 10px 12px; font-size: 11px; line-height: 1.5; color: ${s.textSecondary}; margin-bottom: 14px;">
        💡 <strong style="color: ${s.textPrimary};">How to use:</strong> Highlight any text inside LinkedIn's post composer.
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

      <div style="font-size: 10px; color: ${s.textMuted}; text-align: center; margin-top: 12px;">
        100% Free · Zero Data · LinkedIn Only
      </div>
    </div>
  `;
}

// 制作 1800x1200 的大型综合双主题对比看板
const boardHtml = `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1800px;
    height: 1260px;
    background: #0B0E14;
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
    border-bottom: 1px solid #1E293B;
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
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #34D399;
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

  /* 模拟浅色网页背景 (白色/米白 GitHub/LinkedIn 风格) */
  .light-surface {
    background: #F3F4F6;
    background-image: radial-gradient(#E5E7EB 1.5px, transparent 1.5px);
    background-size: 24px 24px;
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    padding: 24px 32px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  /* 模拟深色网页背景 (Dark Mode 风格) */
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
  .col-header {
    width: 100%;
    margin-bottom: 12px;
    text-align: left;
  }
  .col-tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 6px;
    margin-bottom: 6px;
  }
  .tag-A { background: rgba(56, 189, 248, 0.15); color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.3); }
  .tag-B { background: rgba(129, 140, 248, 0.15); color: #818CF8; border: 1px solid rgba(129, 140, 248, 0.3); }
  .tag-C { background: rgba(241, 245, 249, 0.15); color: #E2E8F0; border: 1px solid rgba(241, 245, 249, 0.3); }

  .col-title {
    font-size: 15px;
    font-weight: 700;
    color: #F8FAFC;
  }
  .col-desc {
    font-size: 12px;
    color: #94A3B8;
    line-height: 1.4;
    margin-top: 3px;
  }

  .light-label {
    font-size: 13px;
    font-weight: 700;
    color: #475569;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .dark-label {
    font-size: 13px;
    font-weight: 700;
    color: #94A3B8;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 14px;
    border-top: 1px solid #1E293B;
    font-size: 13px;
    color: #64748B;
  }
</style>
</head>
<body>
  <div class="header">
    <div>
      <h1>Formatly 弹窗高级深色调配色对比看板 (3 种备选)</h1>
      <p>解决纯黑底色在浅色网页中的生硬反差，在白底与黑底网页中均呈现温润的高级悬浮感</p>
    </div>
    <div class="header-badge">WCAG AAA 高清晰对比度</div>
  </div>

  <!-- 1. 在浅色主题网页下的实机视觉效果 -->
  <div class="section-title">
    ☀️ 场景一：在【浅色网页背景 (白色/米白)】下的悬浮效果
    <span>（测试在白色 GitHub / LinkedIn 页面点击扩展图标时的温润柔和度）</span>
  </div>
  <div class="light-surface">
    <div class="col-box">
      <div class="light-label">🟢 方案 A 在浅色底</div>
      ${renderPopupCardHtml(schemes[0])}
    </div>
    <div class="col-box">
      <div class="light-label">🟣 方案 B 在浅色底</div>
      ${renderPopupCardHtml(schemes[1])}
    </div>
    <div class="col-box">
      <div class="light-label">⚪ 方案 C 在浅色底</div>
      ${renderPopupCardHtml(schemes[2])}
    </div>
  </div>

  <!-- 2. 在深色主题网页下的实机视觉效果 -->
  <div class="section-title">
    🌙 场景二：在【深色网页背景 (暗黑模式)】下的沉浸效果
    <span>（测试在暗黑模式下的色彩层级自洽度与边缘辨识度）</span>
  </div>
  <div class="dark-surface">
    <div class="col-box">
      <div class="dark-label">🟢 方案 A 在深色底</div>
      ${renderPopupCardHtml(schemes[0])}
    </div>
    <div class="col-box">
      <div class="dark-label">🟣 方案 B 在深色底</div>
      ${renderPopupCardHtml(schemes[1])}
    </div>
    <div class="col-box">
      <div class="dark-label">⚪ 方案 C 在深色底</div>
      ${renderPopupCardHtml(schemes[2])}
    </div>
  </div>

  <!-- 3. 色彩设计与方案对比说明 -->
  <div class="footer">
    <div><strong>方案 A (冷杉深岩蓝灰)</strong>：微墨蓝底色 + 冰川青微光，消除纯黑刺眼感（强烈推荐）</div>
    <div><strong>方案 B (午夜墨玉黛蓝)</strong>：午夜微紫蓝调，呼应 Aa 极光流动质感</div>
    <div><strong>方案 C (烟熏钛灰雾面)</strong>：纯中性深灰无色偏，极简冷静自洽</div>
  </div>
</body>
</html>`;

const boardTmp = path.join(__dirname, 'color-board-temp.html');
fs.writeFileSync(boardTmp, boardHtml);
const boardOut = path.join(conceptsDir, 'color-schemes-comparison.png');
console.log('Rendering 3-color comparison board (1800x1260)...');
execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${boardOut}" --window-size=1800,1260 "file://${boardTmp}"`, { stdio: 'ignore' });
if (fs.existsSync(boardTmp)) fs.unlinkSync(boardTmp);

console.log('✓ Color schemes comparison board rendered at: ' + boardOut);
