/**
 * 选区检测模块，用于 LinkedIn 文本格式化扩展。
 * 支持普通 DOM 及 Shadow DOM (如 LinkedIn 发帖弹窗 #interop-outlet)
 * 暴露在 window.SelectionDetector 上。
 */
(function() {
  'use strict';

  let onSelectionChangeCb = null;
  let debounceTimeout = null;
  let lastMouseDownTarget = null;

  /**
   * 判断目标节点或当前聚焦元素是否在可编辑区域内
   * 原生支持 contenteditable 及 Shadow DOM 穿透
   * @param {Node} node 
   * @returns {boolean}
   */
  function isTargetEditable(node) {
    if (node) {
      let el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
      while (el && el !== document.documentElement) {
        if (el.isContentEditable || el.getAttribute?.('contenteditable') === 'true') {
          return true;
        }
        el = el.parentElement || el.parentNode?.host;
      }
    }

    // 穿透检查 document.activeElement
    let active = document.activeElement;
    while (active) {
      if (active.isContentEditable || active.getAttribute?.('contenteditable') === 'true') {
        return true;
      }
      active = active.shadowRoot ? active.shadowRoot.activeElement : null;
    }

    return false;
  }

  function isInToolbar(node) {
    if (!node) return false;
    let el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    while (el && el !== document.documentElement) {
      if (el.hasAttribute && el.hasAttribute('data-lif-toolbar')) {
        return true;
      }
      el = el.parentElement || el.parentNode?.host;
    }
    return false;
  }

  /**
   * 获取当前页面上真实有效的选区详情
   * 彻底解决 Chromium 在 Shadow DOM 跨界时的 Retargeting 与 0 尺寸 Rect 问题
   */
  function getActiveSelectionDetails() {
    // 1. 优先深度探测 document.activeElement 内部的 ShadowRoot 选区
    let active = document.activeElement;
    while (active) {
      if (active.shadowRoot && typeof active.shadowRoot.getSelection === 'function') {
        const s = active.shadowRoot.getSelection();
        if (s && s.rangeCount > 0 && !s.isCollapsed && s.toString().trim()) {
          const r = s.getRangeAt(0);
          const rect = r.getBoundingClientRect();
          if (rect && (rect.width > 0 || rect.height > 0)) {
            return {
              selection: s,
              range: r,
              rect,
              text: s.toString().trim(),
              anchorNode: s.anchorNode
            };
          }
        }
      }
      active = active.shadowRoot ? active.shadowRoot.activeElement : null;
    }

    // 2. 检查 LinkedIn 专用的 Shadow Host（如 #interop-outlet、Artdeco 对话框）
    const hosts = document.querySelectorAll('#interop-outlet, [data-testid="interop-shadowdom"]');
    for (const host of hosts) {
      if (host.shadowRoot && typeof host.shadowRoot.getSelection === 'function') {
        const s = host.shadowRoot.getSelection();
        if (s && s.rangeCount > 0 && !s.isCollapsed && s.toString().trim()) {
          const r = s.getRangeAt(0);
          const rect = r.getBoundingClientRect();
          if (rect && (rect.width > 0 || rect.height > 0)) {
            return {
              selection: s,
              range: r,
              rect,
              text: s.toString().trim(),
              anchorNode: s.anchorNode
            };
          }
        }
      }
    }

    // 3. 通用全局 window.getSelection()
    const winSel = window.getSelection();
    if (winSel && winSel.rangeCount > 0 && !winSel.isCollapsed) {
      const text = winSel.toString().trim();
      if (text) {
        const r = winSel.getRangeAt(0);
        let rect = r.getBoundingClientRect();

        // 若因 Shadow DOM Retargeting 导致 rect 宽度为 0，尝试探测聚焦元素的 shadowRoot
        if (!rect || (rect.width === 0 && rect.height === 0)) {
          let focused = document.activeElement;
          while (focused && focused.shadowRoot) {
            if (typeof focused.shadowRoot.getSelection === 'function') {
              const shadowSel = focused.shadowRoot.getSelection();
              if (shadowSel && shadowSel.rangeCount > 0 && !shadowSel.isCollapsed) {
                const sr = shadowSel.getRangeAt(0);
                const srect = sr.getBoundingClientRect();
                if (srect && (srect.width > 0 || srect.height > 0)) {
                  return {
                    selection: shadowSel,
                    range: sr,
                    rect: srect,
                    text,
                    anchorNode: shadowSel.anchorNode
                  };
                }
              }
            }
            focused = focused.shadowRoot.activeElement;
          }
        } else {
          return {
            selection: winSel,
            range: r,
            rect,
            text,
            anchorNode: winSel.anchorNode
          };
        }
      }
    }

    return null;
  }

  function checkSelection() {
    // 若点击的是工具栏本身，保持显示状态
    if (lastMouseDownTarget && isInToolbar(lastMouseDownTarget)) {
      return;
    }

    const details = getActiveSelectionDetails();
    if (!details) {
      if (onSelectionChangeCb) onSelectionChangeCb(null);
      return;
    }

    if (isInToolbar(details.anchorNode)) {
      return;
    }

    // 验证是否处于可编辑区域
    if (!isTargetEditable(details.anchorNode)) {
      if (onSelectionChangeCb) onSelectionChangeCb(null);
      return;
    }

    console.log('[LIF] ✓ 命中可编辑选区:', details.text, details.rect);

    if (onSelectionChangeCb) {
      onSelectionChangeCb({
        text: details.text,
        rect: details.rect,
        range: details.range,
        selection: details.selection
      });
    }
  }

  function debouncedCheckSelection() {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(() => {
      checkSelection();
    }, 60);
  }

  window.SelectionDetector = {
    init: function(onSelectionChange) {
      onSelectionChangeCb = onSelectionChange;

      document.addEventListener('selectionchange', debouncedCheckSelection);
      
      document.addEventListener('mousedown', (e) => {
        lastMouseDownTarget = e.target;
      });

      document.addEventListener('mouseup', () => {
        debouncedCheckSelection();
      });

      document.addEventListener('keyup', (e) => {
        if (e.shiftKey && (e.key.includes('Arrow') || e.key === 'Home' || e.key === 'End')) {
          lastMouseDownTarget = null;
          debouncedCheckSelection();
        }
      });

      console.log('[LIF] SelectionDetector 监听器已就绪 (Shadow DOM 深度支持模式)');
    },

    destroy: function() {
      document.removeEventListener('selectionchange', debouncedCheckSelection);
      if (debounceTimeout) clearTimeout(debounceTimeout);
      onSelectionChangeCb = null;
      lastMouseDownTarget = null;
    }
  };
})();
