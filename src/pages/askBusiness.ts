import { navTransition } from '$motion/navTransition';
import { chatbot } from '$utils/chatbot';

export const chatBusiness = () => {
  // ------------------
  // Page Globals
  // ------------------

  // set navbar animation
  const hasVideoBG = true;
  const navScrollSection = document.querySelector('.section_services-hero')?.className as string;
  setTimeout(() => {
    navTransition(navScrollSection, hasVideoBG);
  }, 100);

  // ------------------
  // Chatbot
  // ------------------
  chatbot();
};
