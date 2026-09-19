/**
 * Service Worker (background.js)
 * 
 * 轻量级后台脚本，仅负责：
 * 1. 安装时初始化默认设置
 * 2. 不存储任何全局变量状态
 */

// 安装或更新时初始化默认设置
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    // 首次安装：设置默认值
    await chrome.storage.local.set({
      lifEnabled: true
    });
    console.log('[LIF] 插件已安装，默认设置已初始化');
  } else if (details.reason === 'update') {
    console.log('[LIF] 插件已更新至版本', chrome.runtime.getManifest().version);
  }
});
