import { gsap } from 'gsap';

export const updateQuestion = (element: HTMLElement) => {
  const chatArea = document.querySelector('.chatbot_message-area') as Element;
  const revealElement = gsap.timeline();
  revealElement.to(element, {
    opacity: 1,
    display: 'block',
    y: 0,
    duration: 0.6,
    delay: 1,
    ease: 'Power4.easeInOut',
  });
  revealElement.to(
    chatArea,
    {
      scrollTop: chatArea.scrollHeight,
      duration: 0.6,
      ease: 'Power4.easeInOut',
    },
    '-=0.6'
  );
};
