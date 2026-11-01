document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.main-header');
  const mainNav = header?.querySelector('.main-nav');
  const menuButton = header?.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');

  if (!header || !mainNav || !menuButton || !sidebar) return;

  const isCurrentPage = (href) => new URL(href, document.baseURI).pathname === window.location.pathname;
  mainNav.setAttribute('aria-label', 'Main navigation');
  const services = [
    ['Website Development', 'pages/html/website-development/website-development.html'],
    ['App Development', 'pages/html/mobile-app-development/mobile-app-development.html'],
    ['Custom Software', 'pages/html/custom-software-development/custom-software-development.html'],
    ['Desktop Software', 'pages/html/desktop-software-development/desktop-software-development.html'],
    ['E-commerce', 'pages/html/ecommerce-development/ecommerce-development.html'],
    ['AI Solutions', 'pages/html/ai-solutions/ai-solutions.html'],
    ['All Services', 'pages/html/services/services.html']
  ];
  const mainLinks = [
    ['Home', 'pages/html/home/home.html'],
    ['Work', 'pages/html/work/work.html'],
    ['About', 'pages/html/about/about.html'],
    ['Insights', 'pages/html/insights/insights.html'],
    ['Contact', 'pages/html/contact/contact.html']
  ];

  const createLink = (label, href, className) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    if (className) link.className = className;
    if (isCurrentPage(href)) {
      link.setAttribute('aria-current', 'page');
    }
    return link;
  };

  const createServiceLinks = (className) => {
    const links = document.createElement('div');
    links.className = className;
    links.setAttribute('aria-label', 'Service pages');
    services.forEach(([label, href]) => {
      const link = createLink(label, href);
      const hint = document.createElement('span');
      hint.textContent = '→';
      hint.setAttribute('aria-hidden', 'true');
      link.appendChild(hint);
      links.appendChild(link);
    });
    return links;
  };

  const navList = document.createElement('ul');
  const homeItem = document.createElement('li');
  homeItem.appendChild(createLink('Home', mainLinks[0][1]));
  navList.appendChild(homeItem);

  const serviceItem = document.createElement('li');
  serviceItem.className = 'nav-dropdown';
  const serviceButton = document.createElement('button');
  serviceButton.type = 'button';
  serviceButton.className = 'nav-dropdown-toggle';
  serviceButton.setAttribute('aria-expanded', 'false');
  serviceButton.setAttribute('aria-haspopup', 'true');
  serviceButton.setAttribute('aria-controls', 'desktop-services-menu');
  serviceButton.innerHTML = 'Services<span class="nav-service-count" aria-hidden="true">6</span><span class="nav-chevron" aria-hidden="true"></span>';
  if (services.some(([, href]) => isCurrentPage(href))) {
    serviceButton.setAttribute('aria-current', 'page');
  }
  const desktopServicesMenu = createServiceLinks('nav-dropdown-menu');
  desktopServicesMenu.id = 'desktop-services-menu';
  serviceItem.append(serviceButton, desktopServicesMenu);
  navList.appendChild(serviceItem);

  mainLinks.slice(1).forEach(([label, href]) => {
    const item = document.createElement('li');
    item.appendChild(createLink(label, href));
    navList.appendChild(item);
  });
  mainNav.replaceChildren(navList);

  const desktopCta = createLink('Start a project', mainLinks.find(([label]) => label === 'Contact')[1], 'nav-desktop-cta');
  desktopCta.insertAdjacentHTML('beforeend', '<span aria-hidden="true">→</span>');
  header.querySelector('.container').appendChild(desktopCta);

  const mobileContent = document.createElement('div');
  mobileContent.className = 'sidebar-content';
  mobileContent.appendChild(createLink('Home', mainLinks[0][1], 'sidebar-link'));

  const mobileServices = document.createElement('div');
  mobileServices.className = 'mobile-services';
  const mobileServiceButton = document.createElement('button');
  mobileServiceButton.type = 'button';
  mobileServiceButton.className = 'mobile-services-toggle';
  mobileServiceButton.setAttribute('aria-expanded', 'false');
  mobileServiceButton.setAttribute('aria-controls', 'mobile-services-menu');
  mobileServiceButton.innerHTML = 'Services<span class="nav-service-count" aria-hidden="true">6</span><span class="nav-chevron" aria-hidden="true"></span>';
  if (services.some(([, href]) => isCurrentPage(href))) {
    mobileServiceButton.setAttribute('aria-current', 'page');
  }
  const mobileServicesMenu = createServiceLinks('mobile-services-menu');
  mobileServicesMenu.id = 'mobile-services-menu';
  mobileServices.append(mobileServiceButton, mobileServicesMenu);
  mobileContent.appendChild(mobileServices);

  mainLinks.slice(1).forEach(([label, href]) => {
    mobileContent.appendChild(createLink(label, href, 'sidebar-link'));
  });
  mobileContent.appendChild(createLink('Start a project', mainLinks.find(([label]) => label === 'Contact')[1], 'sidebar-link nav-cta'));
  sidebar.replaceChildren(mobileContent);
  sidebar.setAttribute('aria-label', 'Main navigation');
  menuButton.setAttribute('aria-controls', 'sidebar');

  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  header.after(backdrop);

  const closeServices = () => {
    serviceItem.classList.remove('open');
    serviceButton.setAttribute('aria-expanded', 'false');
  };

  const setMenuOpen = (open) => {
    sidebar.classList.toggle('active', open);
    backdrop.classList.toggle('active', open);
    menuButton.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    sidebar.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('navigation-open', open);
    if (!open) {
      mobileServices.classList.remove('open');
      mobileServiceButton.setAttribute('aria-expanded', 'false');
    }
  };

  serviceButton.addEventListener('click', () => {
    const open = !serviceItem.classList.contains('open');
    serviceItem.classList.toggle('open', open);
    serviceButton.setAttribute('aria-expanded', String(open));
  });

  mobileServiceButton.addEventListener('click', () => {
    const open = !mobileServices.classList.contains('open');
    mobileServices.classList.toggle('open', open);
    mobileServiceButton.setAttribute('aria-expanded', String(open));
  });

  menuButton.addEventListener('click', () => {
    setMenuOpen(!sidebar.classList.contains('active'));
  });
  backdrop.addEventListener('click', () => setMenuOpen(false));
  sidebar.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });

  document.addEventListener('click', (event) => {
    if (!serviceItem.contains(event.target)) closeServices();
    if (sidebar.classList.contains('active') &&
        !sidebar.contains(event.target) &&
        !menuButton.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeServices();
      if (sidebar.classList.contains('active')) {
        setMenuOpen(false);
        menuButton.focus();
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && sidebar.classList.contains('active')) {
      setMenuOpen(false);
    }
  });

  const updateHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
});
