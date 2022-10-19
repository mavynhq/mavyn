import { gsap } from 'gsap';

import { querySelectorAlltoArray } from '$utils/querySelectorAlltoArray';

export const menuPopout = () => {
  const mobileMenu = document.querySelector('.nav_menu-popout');
  const menuSpans = querySelectorAlltoArray('.nav_icon-span');

  const mobileMenuTL = gsap.timeline({ paused: true });
  mobileMenuTL
    .to(mobileMenu, { display: 'block' })
    .from(mobileMenu, { duration: 0.8, opacity: 0, ease: 'power4.inOut' }, '<')
    .to(
      menuSpans[0],
      { duration: 0.6, y: 3, rotate: '45deg', backgroundColor: '#18a1ff', ease: 'expo.inOut' },
      '<'
    )
    .to(
      menuSpans[1],
      { duration: 0.6, y: -3, rotate: '-45deg', backgroundColor: '#18a1ff', ease: 'expo.inOut' },
      '<'
    );

  return mobileMenuTL;
};
