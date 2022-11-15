import { navTransition } from '$anim/navTransition';

export const thanks = () => {
  // ------------------
  // Page Globals
  // ------------------

  // set navbar animation
  // ---------------------
  const hasVideoBG = false;
  const navScrollSection = document.querySelector('.section_thanks-main')?.className as string;
  setTimeout(() => {
    navTransition(navScrollSection, hasVideoBG);
  }, 100);

  console.log('thanks');
};
