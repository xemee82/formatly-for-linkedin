/**
 * 文本替换引擎 (Text Replacer)
 * 
 * 负责将选中的文本替换为 Unicode 格式化后的文本。
 * 优先使用 document.execCommand('insertText') 来确保 LinkedIn 编辑器
 * 的内部状态（undo/redo 栈、字数统计等）保持同步。
 */
(function () {
  'use strict';

  const Replacer = {
    /**
     * 对当前选区应用指定的格式化风格
     * @param {string} styleName - 风格名称（如 'bold', 'italic', 'revert' 等）
     * @param {object} [selectionInfo] - 选区上下文信息
     * @returns {boolean} 是否成功替换
     */
    applyFormat(styleName, selectionInfo) {
      const selection = (selectionInfo && selectionInfo.selection) || window.getSelection();
      let selectedText = (selectionInfo && selectionInfo.text) || (selection ? selection.toString() : '');

      if (!selectedText || selectedText.trim().length === 0) {
        return false;
      }

      let convertedText;
      if (styleName === 'revert') {
        convertedText = window.UnicodeMap.revertText(selectedText);
      } else {
        convertedText = window.UnicodeMap.convertText(selectedText, styleName);
      }

      // 文本相同无需处理
      if (convertedText === selectedText) {
        return false;
      }

      // 如果选区被取消，先恢复选区
      if (selectionInfo && selectionInfo.range && selection) {
        try {
          if (selection.rangeCount === 0 || selection.isCollapsed) {
            selection.removeAllRanges();
            selection.addRange(selectionInfo.range);
          }
        } catch (e) {
          console.warn('[LIF] 恢复选区失败:', e);
        }
      }

      // 优先使用 execCommand('insertText') 替换文本
      const success = this._replaceWithExecCommand(convertedText);
      
      if (!success) {
        // Fallback：手动替换 Range 内容并触发 input 事件
        const targetRange = (selectionInfo && selectionInfo.range) || (selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null);
        this._replaceWithRange(selection, targetRange, convertedText);
      }

      return true;
    },

    /**
     * 方案一：使用 execCommand('insertText') 替换
     * @param {string} text - 要插入的文本
     * @returns {boolean} 是否成功
     */
    _replaceWithExecCommand(text) {
      try {
        return document.execCommand('insertText', false, text);
      } catch (e) {
        console.warn('[LIF] execCommand 失败，使用 fallback:', e);
        return false;
      }
    },

    /**
     * 方案二（Fallback）：手动操作 Range 并触发 input 事件
     */
    _replaceWithRange(selection, range, text) {
      try {
        if (!range) return;

        // 删除选区内容
        range.deleteContents();

        // 创建文本节点并插入
        const textNode = document.createTextNode(text);
        range.insertNode(textNode);

        // 将光标移动到插入文本的末尾
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        if (selection) {
          try {
            selection.removeAllRanges();
            selection.addRange(range);
          } catch(e) {}
        }

        // 手动触发 input 事件通知编辑器框架
        const editor = this._findEditorElement(textNode);
        if (editor) {
          editor.dispatchEvent(new InputEvent('input', {
            bubbles: true,
            cancelable: false,
            inputType: 'insertText',
            data: text
          }));
        }
      } catch (e) {
        console.error('[LIF] Range 替换失败:', e);
      }
    },

    /**
     * 向上查找最近的可编辑元素 (支持 Shadow DOM host 穿透)
     * @param {Node} node - 起始节点
     * @returns {Element|null}
     */
    _findEditorElement(node) {
      let current = node;
      while (current && current !== document.documentElement) {
        if (current.nodeType === Node.ELEMENT_NODE &&
            (current.getAttribute?.('contenteditable') === 'true' || current.isContentEditable)) {
          return current;
        }
        current = current.parentElement || current.parentNode?.host;
      }
      return null;
    }
  };

  window.TextReplacer = Replacer;
})();
