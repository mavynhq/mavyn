import { gsap } from 'gsap';

// -----------------------
// Reveal new chat element
// -----------------------
export const chatReveal = (element: HTMLElement) => {
  const chatElement = element.children[0];

  const revealTL = gsap.timeline();
  revealTL.to(chatElement, { duration: 0.6, opacity: 1, display: 'block', ease: 'power4.inOut' });
  revealTL.from(chatElement, { duration: 0.6, y: '1rem', ease: 'power4.inOut' }, '<');
};

export const updateChatPostion = () => {
  const chatArea = document.querySelector('.chatbot_message-component') as Element;

  const updateAnswerTimeline = gsap.timeline();

  updateAnswerTimeline.to(chatArea, {
    scrollTop: chatArea.scrollHeight,
    duration: 0.2,
    ease: 'power4.inOut',
  });
};

// -----------------------
// Chat step error
// -----------------------
export const chatStepError = (index: number, error: string) => {
  const chatFormElements = document.querySelectorAll('.chatbot_text-area.chatbot');
  const curFormElement = chatFormElements[index] as HTMLInputElement;
  const formErrorElement = document.querySelector('.chatbot_step-error');
  const formErrorTextElement = document.querySelector('.chatbot_error-text') as HTMLElement;

  formErrorTextElement.innerHTML = error;

  const stepErrorTimeline = gsap.timeline();
  stepErrorTimeline.to(curFormElement, {
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
