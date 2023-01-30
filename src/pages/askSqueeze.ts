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

  // ------------------
  // Set chat form link
  // ------------------
  const chatForm = document.querySelector('#wf-form-Chatbot-Form') as HTMLFormElement;
  const chatStagingAPI = 'https://staging.mavyn.com/api/v1/calls/chat-form';
  const chatProdAPI = 'https://app.mavyn.com/api/v1/calls/chat-form';
  const curEnv = window.location.hostname;
  const isDev = window.location.search.includes('dev');

  if (curEnv.includes('.webflow.io')) {
    chatForm.action = chatProdAPI;
    if (isDev) {
      chatForm.action = chatStagingAPI;
    }
  }

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
