/**
 * Unicode 字符映射模块（精简版）
 * 仅包含：Bold, Italic, Bold Italic, Sans-Serif Bold
 */
(function () {
  'use strict';

  // Italic 的 h 是一个异常字符，不遵循偏移规律
  const EXCEPTIONS = {
    italic: { 'h': 0x210E }
  };

  // 4 种支持的 Unicode 风格
  const UNICODE_STYLES = {
    bold:           { upper: 0x1D400, lower: 0x1D41A, digit: 0x1D7CE },
    italic:         { upper: 0x1D434, lower: 0x1D44E },
    boldItalic:     { upper: 0x1D468, lower: 0x1D482 },
    sansSerifBold:  { upper: 0x1D5D4, lower: 0x1D5EE, digit: 0x1D7EC }
  };

  /**
   * 将普通文本转换为指定的 Unicode 风格
   */
  function convertText(text, styleName) {
    if (!text) return text;

    const style = UNICODE_STYLES[styleName];
    if (!style) return text;

    const styleExceptions = EXCEPTIONS[styleName] || {};

    let result = '';
    for (let char of text) {
      // 检查异常字符
      if (styleExceptions[char]) {
        result += String.fromCodePoint(styleExceptions[char]);
        continue;
      }

      const code = char.charCodeAt(0);
      
      if (code >= 65 && code <= 90 && style.upper) {
        result += String.fromCodePoint(style.upper + (code - 65));
      } else if (code >= 97 && code <= 122 && style.lower) {
        result += String.fromCodePoint(style.lower + (code - 97));
      } else if (code >= 48 && code <= 57 && style.digit) {
        result += String.fromCodePoint(style.digit + (code - 48));
      } else {
        result += char;
      }
    }
    return result;
  }

  /**
   * 将格式化后的 Unicode 文本还原为普通 ASCII
   */
  function revertText(text) {
    if (!text) return text;

    let result = '';
    
    for (let char of Array.from(text)) {
      const codePoint = char.codePointAt(0);
      let found = false;

      // 检查 Italic h 异常
      if (codePoint === 0x210E) {
        result += 'h';
        continue;
      }

      // 检查是否在已知风格的偏移范围内
      for (const styleName in UNICODE_STYLES) {
        const style = UNICODE_STYLES[styleName];
        
        if (style.upper && codePoint >= style.upper && codePoint < style.upper + 26) {
          result += String.fromCharCode(65 + (codePoint - style.upper));
          found = true;
          break;
        }
        if (style.lower && codePoint >= style.lower && codePoint < style.lower + 26) {
          result += String.fromCharCode(97 + (codePoint - style.lower));
          found = true;
          break;
        }
        if (style.digit && codePoint >= style.digit && codePoint < style.digit + 10) {
          result += String.fromCharCode(48 + (codePoint - style.digit));
          found = true;
          break;
        }
      }

      if (!found) {
        result += char;
      }
    }

    return result;
  }

  window.UnicodeMap = {
    UNICODE_STYLES,
    convertText,
    revertText
  };
})();
