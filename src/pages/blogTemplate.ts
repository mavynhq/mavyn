import { blogCTAMovement } from '$motion/blogCTA';
import { navTransition } from '$motion/navTransition';
import { querySelectorAlltoArray } from '$utils/querySelectorAlltoArray';

export const blogTemplate = () => {
  // ------------------
  // Page Globals
  // ------------------

  // set navbar animation
  // ---------------------
  const hasVideoBG = false;
  const navScrollSection = document.querySelector('.section_blog-template-hero')
    ?.className as string;
  setTimeout(() => {
    navTransition(navScrollSection, hasVideoBG);
  }, 100);

  // ------------------
  // Set CTA
  // ------------------
  const blogServiceType = document.querySelector('#blogTemplateService')?.innerHTML as string;
  const ctaSections = querySelectorAlltoArray('.blog_cta-link');

  // console.log(ctaSections);

  // console.log('page service type: ', blogServiceType);

  for (let i = 0; i <= ctaSections.length - 1; i++) {
    const setCTA = ctaSections[i] as HTMLElement;
    const ctaType = setCTA.children[0].children[1].children[0].children[1].innerHTML as string;
    // console.log('cur cta type: ', ctaType);

    if (ctaType === blogServiceType) {
      // console.log('match');
      blogCTAMovement(setCTA);
    } else if (ctaType !== blogServiceType) {
      // console.log('no match');
      setCTA.style.display = 'none';
    }
  }
};
