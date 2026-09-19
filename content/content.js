/**
 * Content Script 主入口（简化直出版）
 */
(function () {
  'use strict';

  if (window.__lifInitialized) return;
  window.__lifInitialized = true;

  console.log('[LIF] ★★★ LinkedIn Inline Formatter Content Script 已加载 ★★★');

  let currentSelectionInfo = null;

  // 1. 初始化浮动工具栏
  window.FloatingToolbar.init((styleName) => {
    console.log('[LIF] 点击了格式化风格:', styleName);
    if (!currentSelectionInfo) return;

    const selection = currentSelectionInfo.selection || window.getSelection();
    if (!selection || selection.isCollapsed) {
      try {
        selection.removeAllRanges();
        selection.addRange(currentSelectionInfo.range);
      } catch (e) {
        console.warn('[LIF] 恢复选区失败:', e);
      }
    }

    const success = window.TextReplacer.applyFormat(styleName, currentSelectionInfo);
    console.log('[LIF] 格式化替换结果:', success);

    if (success) {
      setTimeout(() => {
        window.FloatingToolbar.hide();
        currentSelectionInfo = null;
      }, 150);
    }
  });

  // 2. 初始化选区检测
  window.SelectionDetector.init((info) => {
    if (info) {
      currentSelectionInfo = info;
      console.log('[LIF] 收到有效选区，准备弹出工具栏:', info.text);
      window.FloatingToolbar.show(info.rect);
    } else {
      if (window.FloatingToolbar.isVisible()) {
        setTimeout(() => {
          const sel = (currentSelectionInfo && currentSelectionInfo.selection) || window.getSelection();
          if (!sel || sel.isCollapsed) {
            window.FloatingToolbar.hide();
            currentSelectionInfo = null;
          }
        }, 200);
      }
    }
  });

  console.log('[LIF] 全部模块初始化完毕 ✓');
})();
