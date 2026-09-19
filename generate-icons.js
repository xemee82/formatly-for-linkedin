/**
 * 图标生成脚本
 * 使用 OffscreenCanvas polyfill (canvas 包) 生成插件图标 PNG
 * 运行: node generate-icons.js
 */
const fs = require('fs');
const path = require('path');

// 不依赖 canvas 包，直接生成最简单的有效 PNG
// 使用纯 JavaScript 生成 PNG (无外部依赖)

function createPNG(size, bgColor, fgColor, text) {
  // 简化方案：生成一个纯色 PNG 图标
  // PNG 结构: Signature + IHDR + IDAT + IEND
  
  const width = size;
  const height = size;

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);   // Width
  ihdrData.writeUInt32BE(height, 4);  // Height
  ihdrData.writeUInt8(8, 8);          // Bit depth
  ihdrData.writeUInt8(2, 9);          // Color type (RGB)
  ihdrData.writeUInt8(0, 10);         // Compression
  ihdrData.writeUInt8(0, 11);         // Filter
  ihdrData.writeUInt8(0, 12);         // Interlace

  const ihdr = createChunk('IHDR', ihdrData);

  // IDAT chunk - raw image data
  // 使用渐变色背景
  const rawData = [];
  const r1 = bgColor[0], g1 = bgColor[1], b1 = bgColor[2];
  const r2 = fgColor[0], g2 = fgColor[1], b2 = fgColor[2];

  for (let y = 0; y < height; y++) {
    rawData.push(0); // Filter byte: None
    for (let x = 0; x < width; x++) {
      // 创建一个简单的圆角渐变效果
      const cx = width / 2, cy = height / 2;
      const radius = width * 0.42;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);

      if (dist <= radius) {
        // 圆形内部：渐变背景
        const t = y / height;
        const r = Math.round(r1 + (r2 - r1) * t * 0.3);
        const g = Math.round(g1 + (g2 - g1) * t * 0.3);
        const b = Math.round(b1 + (b2 - b1) * t * 0.3);
        rawData.push(r, g, b);
      } else {
        // 圆形外部：白色/透明
        rawData.push(240, 240, 240);
      }
    }
  }

  // 使用 zlib deflate 压缩
  const zlib = require('zlib');
  const compressed = zlib.deflateSync(Buffer.from(rawData));

  const idat = createChunk('IDAT', compressed);

  // IEND chunk
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const typeBuffer = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuffer, data]);

  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcData), 0);

  return Buffer.concat([length, typeBuffer, data, crc]);
}

function crc32(buffer) {
  let crc = 0xFFFFFFFF;
  const table = [];

  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }

  for (let i = 0; i < buffer.length; i++) {
    crc = table[(crc ^ buffer[i]) & 0xFF] ^ (crc >>> 8);
  }

  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// 生成图标
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const sizes = [16, 48, 128];
const bgColor = [0, 119, 181]; // LinkedIn 蓝色
const fgColor = [255, 255, 255];

for (const size of sizes) {
  const png = createPNG(size, bgColor, fgColor, 'LF');
  const filename = `icon-${size}.png`;
  fs.writeFileSync(path.join(iconsDir, filename), png);
  console.log(`✓ 已生成 ${filename} (${size}x${size})`);
}

console.log('\\n所有图标已生成到 icons/ 目录');
