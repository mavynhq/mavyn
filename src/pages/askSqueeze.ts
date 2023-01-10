import { navTransition } from '$motion/navTransition';
import { chatbot } from '$utils/chatbot';
import { querySelectorAlltoArray } from '$utils/querySelectorAlltoArray';

export const squeeze = () => {
  // ------------------
  // Page Globals
  // ------------------

  // set navbar animation
  const hasVideoBG = true;
  const navScrollSection = document.querySelector('.section_services-hero')?.className as string;
  setTimeout(() => {
    navTransition(navScrollSection, hasVideoBG);
  }, 100);

  // ----------------------
  // Chatbot
  // ----------------------
  chatbot();

  // -----------------------------
  // Hide un-initialized elements
  // -----------------------------

  // Testimonials
  const autoQuestions = querySelectorAlltoArray('.side-collection_item');
  const testimonialsSection = document.querySelector(
    '.section_services-testimonials'
  ) as HTMLElement;
  const testitems = querySelectorAlltoArray('.services-testimonials_item');

  if (testitems.length === 0) {
    testimonialsSection.style.display = 'none';
  }

  // Autofill questions
  const autoFillSection = document.querySelector('.side-content_collection') as HTMLElement;

  if (autoQuestions.length === 0) {
    autoFillSection.style.display = 'none';
  }
};
