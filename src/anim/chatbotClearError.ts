import { gsap } from 'gsap';

export const clearError = () => {
  const formErrorElement = document.querySelector('.chat-step-error');

  const clearErrorTimeline = gsap.timeline();
  clearErrorTimeline.to(formErrorElement, {
    duration: 0.6,
    display: 'none',
    opacity: 0,
    ease: 'Power4.easeIn',
  });
};
