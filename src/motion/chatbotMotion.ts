import { gsap } from 'gsap';

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
