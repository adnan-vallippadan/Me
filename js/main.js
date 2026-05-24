/* MAIN.JS — Portfolio Interactivity
   Adnan Vallippadan Portfolio */

'use strict';

/* Utilities */

const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];


/* Footer year */

function initFooterYear() {
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}


/* Navbar: scroll class + active link */

function initNav() {
  const navbar = $('#navbar');
  const navLinks = $$('.nav__link');
  const sections = $$('section[id]');

  // Scroll class
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    highlightActiveLink();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init on load

  // Active link highlight via IntersectionObserver
  function highlightActiveLink() {
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 100) currentId = section.id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${currentId}`);
      link.setAttribute('aria-current', href === `#${currentId}` ? 'page' : 'false');
    });
  }
}


/* Mobile drawer */

function initMobileMenu() {
  const hamburger = $('#hamburger');
  const drawer = $('#mobile-drawer');
  const drawerLinks = $$('.nav__link', drawer);

  if (!hamburger || !drawer) return;

  function openDrawer() {
    hamburger.classList.add('open');
    drawer.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    drawerLinks.forEach(link => link.setAttribute('tabindex', '0'));
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    drawerLinks.forEach(link => link.setAttribute('tabindex', '-1'));
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  // Close on link click
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (drawer.classList.contains('open') &&
      !drawer.contains(e.target) &&
      !hamburger.contains(e.target)) {
      closeDrawer();
    }
  });
}


/* Scroll reveal */

function initScrollReveal() {
  const revealElements = $$('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}


/* Smooth anchor scroll (extra fallback for older browsers) */

function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = $(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}


/* Skill cards stagger animation */

function initSkillsStagger() {
  const skillCards = $$('.skill-card');

  if (!skillCards.length) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      skillCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 50);
      });
      observer.disconnect();
    }
  }, { threshold: 0.1 });

  const skillsSection = $('#skills');
  if (skillsSection) observer.observe(skillsSection);
}


/* Cursor glow effect (desktop only) */

function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return; // skip touch devices

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    will-change: transform;
  `;
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;
  let animId;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    glow.style.left = `${curX}px`;
    glow.style.top = `${curY}px`;
    animId = requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
}


/* Initialize all portfolio features */

function initialize() {
  initFooterYear();
  initNav();
  initMobileMenu();
  initScrollReveal();
  initSmoothScroll();
  initSkillsStagger();
  initCursorGlow();
}
