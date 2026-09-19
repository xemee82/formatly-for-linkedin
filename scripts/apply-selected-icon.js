const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const iconsDir = path.join(rootDir, 'icons');
const conceptsDir = path.join(iconsDir, 'concepts');
const storeAssetsDir = path.join(rootDir, 'store-assets');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// 1. 采用方案 1 (concept-aa.svg)
const sourceSvg = path.join(conceptsDir, 'concept-aa.svg');
const targetSvg = path.join(iconsDir, 'icon.svg');
fs.copyFileSync(sourceSvg, targetSvg);
console.log('✓ Overwritten icons/icon.svg with concept-aa.svg (Option 1: Classic Baseline Aa)');

// 2. 渲染各尺寸 PNG
const sizes = [16, 32, 48, 128, 512];
const svgContent = fs.readFileSync(sourceSvg, 'utf8');
const tempHtml = path.join(__dirname, 'temp-render.html');

for (const size of sizes) {
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; }
  html, body {
    width: ${size}px;
    height: ${size}px;
    background: transparent;
    overflow: hidden;
  }
  svg {
    width: ${size}px;
    height: ${size}px;
    display: block;
  }
</style>
</head>
<body>
${svgContent}
</body>
</html>`;

  fs.writeFileSync(tempHtml, html);
  const outPng = path.join(iconsDir, `icon-${size}.png`);
  const cmd = `"${chromePath}" --headless --disable-gpu --screenshot="${outPng}" --window-size=${size},${size} --default-background-color=00000000 "file://${tempHtml}"`;
  execSync(cmd, { stdio: 'ignore' });
  console.log(`✓ Rendered icons/icon-${size}.png (${size}x${size})`);
}

if (fs.existsSync(tempHtml)) fs.unlinkSync(tempHtml);

// 3. 复制为 formatly-aa-icon.png 供 README 彻底防缓存
fs.copyFileSync(path.join(iconsDir, 'icon-128.png'), path.join(iconsDir, 'formatly-aa-icon.png'));
console.log('✓ Updated icons/formatly-aa-icon.png');

// 4. 重新生成商店视觉图 (screenshots & promo tile)
console.log('Regenerating store assets...');
execSync(`node "${path.join(__dirname, 'generate-assets.js')}"`, { stdio: 'inherit' });

// 复制防缓存版本
fs.copyFileSync(path.join(storeAssetsDir, 'screenshot-1-toolbar.png'), path.join(storeAssetsDir, 'screenshot-1.png'));
fs.copyFileSync(path.join(storeAssetsDir, 'screenshot-2-styles.png'), path.join(storeAssetsDir, 'screenshot-2.png'));

// 5. 重新打包发布 zip
console.log('Re-packaging release zip...');
execSync(`node "${path.join(__dirname, 'package.js')}"`, { stdio: 'inherit' });

console.log('\n🎉 ALL ASSETS APPLIED AND PACKAGED SUCCESSFULLY!');
