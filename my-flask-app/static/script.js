const root = document.documentElement;
root.classList.add('js');

const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

const isMobileView = () => window.innerWidth <= 768;

const setMenuState = (isOpen) => {
  if (!navToggle || !navMenu) {
    return;
  }

  navToggle.setAttribute('aria-expanded', String(isOpen));
  navMenu.classList.toggle('nav-menu--open', isOpen);

  const mobileView = isMobileView();

  if (mobileView) {
    navMenu.hidden = !isOpen;
    navMenu.setAttribute('aria-hidden', String(!isOpen));
  } else {
    navMenu.hidden = false;
    navMenu.removeAttribute('aria-hidden');
  }

  document.body.classList.toggle('menu-open', isOpen && mobileView);
};

setMenuState(false);

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isExpanded);
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  window.addEventListener('resize', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

    if (isMobileView()) {
      setMenuState(isExpanded);
    } else {
      setMenuState(false);
    }
  });
}

const handleScroll = () => {
  if (!header) {
    return;
  }

  header.classList.toggle('is-scrolled', window.scrollY > 20);
};

handleScroll();
window.addEventListener('scroll', handleScroll, { passive: true });

const animatedElements = document.querySelectorAll('.animate-on-scroll');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  animatedElements.forEach((element) => observer.observe(element));
} else {
  animatedElements.forEach((element) => element.classList.add('is-visible'));
}
