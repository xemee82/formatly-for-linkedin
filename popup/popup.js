/**
 * Popup 控制脚本
 */
document.addEventListener('DOMContentLoaded', () => {
  const btnLinkedin = document.getElementById('btnLinkedin');
  const btnGithub = document.getElementById('btnGithub');

  if (btnLinkedin) {
    btnLinkedin.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: btnLinkedin.getAttribute('href') });
    });
  }

  if (btnGithub) {
    btnGithub.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: btnGithub.getAttribute('href') });
    });
  }
});
