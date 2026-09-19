# Contributing to Formatly for LinkedIn

Thank you for your interest in contributing to **Formatly for LinkedIn**! We welcome bug reports, feature suggestions, code contributions, and new typography styles.

---

## 🛠️ Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/formatly-for-linkedin.git
   cd formatly-for-linkedin
   ```

2. **Load into Chrome / Edge**:
   - Open `chrome://extensions` or `edge://extensions`.
   - Enable **Developer mode**.
   - Click **Load unpacked** and select this directory.

3. **Run Unit Tests**:
   - The project uses pure native Node.js assertions without external test runners:
   ```bash
   node content/unicode-map.test.js
   ```

---

## 🎨 Adding New Typography Styles

To add a new Unicode font style:
1. Open `content/unicode-map.js`.
2. Add your alphabet / numeric mapping offsets in `CHAR_MAPS`.
3. Add a unit test in `content/unicode-map.test.js` to verify bidirectional transformation.
4. Add the corresponding button in `content/toolbar.js`.

---

## 📝 Pull Request Guidelines

1. Ensure all unit tests pass (`node content/unicode-map.test.js`).
2. Keep the extension **Zero-Permission**: do not add `permissions` or `host_permissions` unless strictly discussed and approved in an issue.
3. Adhere to **Trusted Types** safety: never use `innerHTML` in content scripts; use native DOM creation methods (`document.createElement`).
4. Write clear commit messages following Conventional Commits format (e.g., `feat: add strikethrough unicode style`).
