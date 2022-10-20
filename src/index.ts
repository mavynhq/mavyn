import { menuPopout } from '$anim/menuPopout';
import { querySelectorAlltoArray } from '$utils/querySelectorAlltoArray';

import { blog } from './pages/blog';
import { blogTemplate } from './pages/blogTemplate';
import { homepage } from './pages/home.js';
import { squeeze } from './pages/squeeze';

window.Webflow ||= [];
window.Webflow.push(() => {
  // ------------------
  // Site Globals
  // ------------------

  // Menu Popout
  // -----------
  const desktopButton = document.querySelector('#chatButton')?.className as string;
  const mobileButton = document.querySelector('.nav_icon');
  const footerButton = document.querySelector('#footerChatButton');

  const menuButtons = querySelectorAlltoArray('.menu_button');
  // let menuOpen = false;
  const menuAnim = menuPopout();

  console.log(menuButtons);

  for (let i = 0; i <= menuButtons.length - 1; i++) {
    console.log(menuButtons[i]);
  }

  // menuButton?.addEventListener('click', (e) => {
  //   menuOpen = !menuOpen;
  //   if (menuOpen === true) {
  //     menuAnim.play();
  //   }
  // });

  // desktopButton?.addEventListener('click', (e) => {
  //   menuOpen = !menuOpen;
  //   if (menuOpen === true) {
  //     menuAnim.play();
  //   }

  //   console.log(e.target);
  //   const target = e.target as HTMLElement;
  // });

  // document.addEventListener('click', (e) => {
  //   const target = e.target as HTMLElement;
  //   console.log('click', target);

  //   if (target.closest(desktopButton)) {
  //     console.log('open menu');
  //   }
  //   // if (menuOpen === true) {
  //   //   menuAnim.reverse();
  //   // }
  // });

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
