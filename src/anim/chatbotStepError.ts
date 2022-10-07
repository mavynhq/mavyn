import { gsap } from 'gsap';

export const stepError = (index: number, error: string) => {
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
  stepErrorTimeline.to(
    formErrorElement,
    {
      duration: 0.5,
      display: 'flex',
      opacity: 1,
      ease: 'Power4.easeIn',
    },
    '<'
  );
};
