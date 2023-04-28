import { menuPopout } from '$motion/menuPopout';
import { querySelectorAlltoArray } from '$utils/querySelectorAlltoArray';

import { chatBusiness } from './pages/askBusiness';
import { askGeneral } from './pages/askGeneral';
import { squeeze } from './pages/askSqueeze';
import { blog } from './pages/blog';
import { blogTemplate } from './pages/blogTemplate';
import { recruitment } from './pages/expertRecruitment';
import { homepage } from './pages/home.js';
import { terms } from './pages/terms';
import { thanks } from './pages/thanks';

window.Webflow ||= [];
window.Webflow.push(() => {
  // ------------------
  // Site Globals
  // ------------------

  // Menu Popout
  // -----------
  const menuButtons = querySelectorAlltoArray('.menu_button');
  const pageWrapper = document.querySelector('.main-wrapper');
  const closeButton = document.querySelector('.nav_menu-close');
  let menuOpen = false;
  const menuAnim = menuPopout();

  for (let i = 0; i <= menuButtons.length - 1; i++) {
    menuButtons[i].addEventListener('click', () => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        menuAnim.play();
      } else {
        menuAnim.reverse();
      }
    });
  }

  closeButton?.addEventListener('click', () => {
    menuOpen = false;
    if (menuOpen === false) {
      menuAnim.reverse();
    }
  });

  pageWrapper?.addEventListener('click', () => {
    menuOpen = false;
    if (menuOpen === false) {
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
  } else if (
    windowLocation.includes('/ask') &&
    !windowLocation.includes('/ask-anything') &&
    !windowLocation.includes('/ask-business')
  ) {
    squeeze();
  } else if (windowLocation === '/ask-anything') {
    askGeneral();
  } else if (windowLocation.includes('/ask-business')) {
    chatBusiness();
  } else if (windowLocation.includes('/blog')) {
    const hasFurtherIndex = windowLocation.substring(5);
    if (hasFurtherIndex === '') {
      blog();
    } else {
      blogTemplate();
    }
  } else if (windowLocation === '/thank-you') {
    thanks();
  } else if (windowLocation === '/terms-of-service') {
    terms();
  } else if (windowLocation === '/expert-recruitment') {
    recruitment();
  }
});
