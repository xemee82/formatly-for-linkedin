/**
 * Unicode 映射模块单元测试（精简版）
 * 运行: node --test content/unicode-map.test.js
 */
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

global.window = {};
require('./unicode-map.js');
const { convertText, revertText } = global.window.UnicodeMap;

describe('convertText', () => {
  test('Bold', () => assert.equal(convertText('Hello', 'bold'), '𝐇𝐞𝐥𝐥𝐨'));
  test('Bold 数字', () => assert.equal(convertText('123', 'bold'), '𝟏𝟐𝟑'));
  test('Italic', () => assert.equal(convertText('Hello', 'italic'), '𝐻𝑒𝑙𝑙𝑜'));
  test('Italic h 异常', () => assert.equal(convertText('h', 'italic'), 'ℎ'));
  test('Bold Italic', () => assert.equal(convertText('Test', 'boldItalic'), '𝑻𝒆𝒔𝒕'));
  test('Sans-Serif Bold', () => assert.equal(convertText('Test', 'sansSerifBold'), '𝗧𝗲𝘀𝘁'));
  test('Sans-Serif Bold 数字', () => assert.equal(convertText('123', 'sansSerifBold'), '𝟭𝟮𝟯'));
  test('保留空格和标点', () => assert.equal(convertText('Hi, World!', 'bold'), '𝐇𝐢, 𝐖𝐨𝐫𝐥𝐝!'));
  test('保留 CJK', () => assert.equal(convertText('Hello 你好', 'bold'), '𝐇𝐞𝐥𝐥𝐨 你好'));
  test('保留 Emoji', () => assert.equal(convertText('Hi 👋', 'bold'), '𝐇𝐢 👋'));
  test('不存在的风格返回原文', () => assert.equal(convertText('test', 'xxx'), 'test'));
});

describe('revertText', () => {
  test('还原 Bold', () => assert.equal(revertText(convertText('Hello', 'bold')), 'Hello'));
  test('还原 Italic', () => assert.equal(revertText(convertText('World', 'italic')), 'World'));
  test('还原 Bold Italic', () => assert.equal(revertText(convertText('Test', 'boldItalic')), 'Test'));
  test('还原 Sans-Serif Bold', () => assert.equal(revertText(convertText('Test123', 'sansSerifBold')), 'Test123'));
  test('保留普通文本', () => assert.equal(revertText('普通文本 123'), '普通文本 123'));
});

describe('往返一致性', () => {
  const text = 'The quick brown fox jumps 0123456789';
  for (const style of ['bold', 'italic', 'boldItalic', 'sansSerifBold']) {
    test(`${style}: convert → revert`, () => {
      assert.equal(revertText(convertText(text, style)), text);
    });
  }
});
