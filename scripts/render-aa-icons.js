const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const iconsDir = path.join(rootDir, 'icons');
const svgSource = path.join(iconsDir, 'icon-aa.svg');
const svgDest = path.join(iconsDir, 'icon.svg');

// 1. 覆盖 icon.svg 为 icon-aa.svg
fs.copyFileSync(svgSource, svgDest);
console.log('✓ Overwritten icons/icon.svg with icon-aa.svg');

// 2. 准备 HTML 包装以供 Chrome 无头渲染
const tempHtml = path.join(__dirname, 'render-icon.html');
const svgContent = fs.readFileSync(svgSource, 'utf8');

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sizes = [16, 32, 48, 128, 512];

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
  
  console.log(`Rendering icon-${size}.png (${size}x${size})...`);
  execSync(cmd, { stdio: 'ignore' });
}

if (fs.existsSync(tempHtml)) {
  fs.unlinkSync(tempHtml);
}

console.log('✓ All Aa icons rendered successfully!');
