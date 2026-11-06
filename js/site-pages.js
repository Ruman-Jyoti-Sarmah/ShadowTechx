document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.main-header .main-nav a[href]').forEach((link) => {
    // In-page anchors share their parent's pathname, so skip them — only the
    // page-level link should claim "current".
    if (link.hash) return;
    if (new URL(link.href, document.baseURI).pathname === window.location.pathname) {
      link.setAttribute('aria-current', 'page');
    }
  });
});
