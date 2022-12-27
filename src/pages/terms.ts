import { navTransition } from '$motion/navTransition';

export const terms = () => {
  // ------------------
  // Page Globals
  // ------------------

  // set navbar animation
  // ---------------------
  console.log('terms');
  const hasVideoBG = false;
  const navScrollSection = document.querySelector('.section_thanks-main')?.className as string;
  setTimeout(() => {
    navTransition(navScrollSection, hasVideoBG);
  }, 100);
};
