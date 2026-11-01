document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.main-header .main-nav a[href]').forEach((link) => {
    if (new URL(link.href, document.baseURI).pathname === window.location.pathname) {
      link.setAttribute('aria-current', 'page');
    }
  });
});
