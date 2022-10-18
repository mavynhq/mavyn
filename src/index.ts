import { menuMobile } from '$anim/menuMobileReveals';

import { blog } from './pages/blog';
import { homepage } from './pages/home.js';
import { squeeze } from './pages/squeeze';

window.Webflow ||= [];
window.Webflow.push(() => {
  // ------------------
  // Site Globals
  // ------------------

  // Mobile Menu
  // -----------
  const mobileMenu = document.querySelector('.nav_menu-desktop');
  const menuButton = document.querySelector('.nav_icon');
  let menuOpen = false;
  const menuAnim = menuMobile();

  menuButton?.addEventListener('click', (e) => {
    // console.log('btn');
    menuOpen = !menuOpen;

    if (menuOpen === true) {
      menuAnim.play();
    } else {
      menuAnim.reverse();
    }
  });

  // ------------------
  // Page Modules
  // ------------------
  const windowLocation = window.location.pathname as string;

  if (windowLocation === '/') {
    homepage();
  } else if (windowLocation.includes('/ask')) {
    squeeze();
  } else if (windowLocation.includes('/blog')) {
    blog();
  }
});
