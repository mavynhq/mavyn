import { navTransition } from '$motion/navTransition';
import { aiChatbot } from '$utils/chatbot';

export const askGeneral = () => {
  // ------------------
  // Page Globals
  // ------------------
  // set navbar animation
  // ---------------------
  const hasVideoBG = true;
  const navScrollSection = document.querySelector('.section_services-hero')?.classList[0] as string;
  setTimeout(() => {
    navTransition(navScrollSection, hasVideoBG);
  }, 100);

  // ------------------
  // Chatbot
  // ------------------
  aiChatbot();
};
