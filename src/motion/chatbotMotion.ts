import { gsap } from 'gsap';

// -----------------------
// Reveal new chat element
// -----------------------
export const chatReveal = (element: HTMLElement) => {
  const chatElement = element;

  const revealTL = gsap.timeline();
  revealTL.to(chatElement, { duration: 0.6, display: 'flex', ease: 'power4.inOut' });
  revealTL.from(chatElement, { duration: 0.6, y: '1rem', opacity: 0, ease: 'power4.inOut' }, '<');
};

// -----------------------
// Update Chat View
// -----------------------
export const updateChatPostion = () => {
  // console.log('update pos');
  const chatArea = document.querySelector('.chatbot_message-component') as Element;

  const updateAnswerTimeline = gsap.timeline();

  updateAnswerTimeline.to(chatArea, {
    scrollTop: chatArea.scrollHeight,
    duration: 0.2,
    ease: 'power4.inOut',
  });
};

// -------------------------
// Chatbot Switch Transition
// -------------------------
export const switchChatbot = (element: HTMLElement) => {
  const staticInput = document.querySelector('#chatInput');
  const aiInput = document.querySelector('#aiChatInput');

  const transitionTL = gsap.timeline();
  transitionTL
    .set(staticInput, { duration: 0, display: 'none' })
    .set(aiInput, { duration: 0, display: 'block' });
  transitionTL
    .to(element, { duration: 0.6, display: 'flex', ease: 'power4.inOut' })
    .from(element, { duration: 0.6, opacity: 0, y: '1rem', ease: 'power4.inOut' }, '<');
};

// -----------------------
// Toggle Fullscreen Image
// -----------------------
// export const chatImageFullscreen = () => {};

// -----------------------
// Chat step error
// -----------------------
export const chatStepError = (index: number, error: string) => {
  const chatInput = document.querySelectorAll('.chatbot_text-area.chatbot');
  const formErrorElement = document.querySelector('.chatbot_step-error');
  const formErrorTextElement = document.querySelector('.chatbot_error-text') as HTMLElement;

  formErrorTextElement.innerHTML = error;

  const stepErrorTimeline = gsap.timeline();
  stepErrorTimeline.to(chatInput, {
    duration: 0.5,
    backgroundColor: 'rgba(24, 161, 255, 0.1)',
    borderColor: 'rgba(24, 161, 255, 0.6)',
  });
  stepErrorTimeline.to(formErrorElement, {
    duration: 0.5,
    display: 'flex',
    opacity: 1,
    ease: 'Power4.easeIn',
  });
};

// -----------------------
// Chat clear step error
// -----------------------
export const chatClearError = () => {
  const formErrorElement = document.querySelector('.chatbot_step-error');

  const clearErrorTimeline = gsap.timeline();
  clearErrorTimeline.to(formErrorElement, {
    duration: 0.6,
    display: 'none',
    opacity: 0,
    ease: 'Power4.easeIn',
  });
};
