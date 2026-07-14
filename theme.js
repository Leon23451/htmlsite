const themeStorageKey = 'ki-im-alltag-theme';

function readTheme() {
  try {
    return localStorage.getItem(themeStorageKey) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // Die Website funktioniert auch dann, wenn der Browser keine lokale Speicherung erlaubt.
  }
}

function setTheme(theme, shouldSave = false) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

  document.querySelectorAll('[data-theme-toggle]').forEach(toggle => {
    const label = toggle.querySelector('.theme-toggle-label');
    toggle.classList.toggle('is-dark-active', isDark);
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Light Mode aktivieren' : 'Dark Mode aktivieren');
    if (label) label.textContent = isDark ? 'Light' : 'Dark';
  });

  if (shouldSave) saveTheme(theme);
}

function initialiseTheme() {
  setTheme(readTheme());
  document.querySelectorAll('[data-theme-toggle]').forEach(toggle => {
    toggle.addEventListener('click', () => {
      setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark', true);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialiseTheme, { once: true });
} else {
  initialiseTheme();
}
