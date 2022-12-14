import { gsap } from 'gsap';

export const preloader = () => {
  const pageContent = document.querySelector('.main-wrapper') as HTMLElement;
  const nav = document.querySelector('.nav_component');
  const preloadWrapper = document.querySelector('.preloader_component') as HTMLElement;
  const preloaderImg = preloadWrapper.children[0];
  const bookingForm = document.querySelector('.home-hero_booking-component');
  const orb1 = document.querySelector('.blur-p._01');
  const orb2 = document.querySelector('.blur-p._02');

  const preloadTL = gsap.timeline({ paused: true });

  preloadTL.set(preloadWrapper, { display: 'flex' });
  preloadTL.set(pageContent, { opacity: '0' });

  preloadTL.from(preloaderImg, { duration: 0.6, opacity: 0, y: '1rem', ease: 'Power4.easeInOut' });
  preloadTL.from(orb1, { duration: 1, rotate: '140deg', ease: 'power4.easeOut' }, 0);
  preloadTL.from(orb2, { duration: 1, rotate: '-20deg', ease: 'power4.easeOut' }, 0);

  preloadTL.to(pageContent, {
    duration: 0,
    display: 'block',
  });
  preloadTL.to(preloaderImg, {
    duration: 0.6,
    opacity: 0,
    y: '-1rem',
    ease: 'Power4.easeInOut',
  });
  preloadTL.to(pageContent, {
    opacity: 1,
    ease: 'power4.easeIn',
  });
  preloadTL.to(bookingForm, { duration: 0.6, y: '0rem', ease: 'power4.easeInOut' }, '<');
  preloadTL.to(
    nav,
    {
      duration: 0.8,
      y: '0%',
      ease: 'power2.easeInOut',
    },
    '-=0.5'
  );

  preloadTL.set(preloadWrapper, { display: 'none' });
  return preloadTL;
  //   console.log('orb', orb1);
};
