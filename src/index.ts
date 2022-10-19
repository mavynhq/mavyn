import { menuPopout } from '$anim/menuPopout';

import { blog } from './pages/blog';
import { blogTemplate } from './pages/blogTemplate';
import { homepage } from './pages/home.js';
import { squeeze } from './pages/squeeze';

window.Webflow ||= [];
window.Webflow.push(() => {
  // ------------------
  // Site Globals
  // ------------------

  // Mobile Popout
  // -----------
  const desktopButton = document.querySelector('#chatButton');
  const menuButton = document.querySelector('.nav_icon');
  let menuOpen = false;
  const menuAnim = menuPopout();

  menuButton?.addEventListener('click', (e) => {
    menuOpen = !menuOpen;
    if (menuOpen === true) {
      menuAnim.play();
    } else {
      menuAnim.reverse();
    }
  });

  desktopButton?.addEventListener('click', (e) => {
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
  // console.log('window', windowLocation);

  if (windowLocation === '/') {
    homepage();
  } else if (windowLocation.includes('/ask')) {
    squeeze();
  } else if (windowLocation.includes('/blog')) {
    const hasFurtherIndex = windowLocation.substring(5);

    if (hasFurtherIndex === '') {
      blog();
    } else {
      blogTemplate();
    }
  }
});
