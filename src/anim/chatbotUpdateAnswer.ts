import { gsap } from 'gsap';

export const updateAnswer = (
  chatElement: HTMLElement,
  curFormElement: HTMLInputElement,
  nextFormElement: HTMLInputElement
) => {
  const chatArea = document.querySelector('.chatbot_message-area') as Element;
  chatElement.children[0].innerHTML = curFormElement.value;
  const updateAnswerTimeline = gsap.timeline();
  updateAnswerTimeline.to(chatElement, {
    opacity: 1,
    y: 0,
    display: 'block',
    duration: 0.6,
    ease: 'Power4.easeInOut',
  });
  updateAnswerTimeline.to(curFormElement, { display: 'none', duration: 0 }, '-=0.6');
  updateAnswerTimeline.to(nextFormElement, { display: 'block', duration: 0 }, '-=0.6');

  updateAnswerTimeline.to(
    chatArea,
    {
      scrollTop: chatArea.scrollHeight,
      duration: 0.6,
      ease: 'Power4.easeInOut',
    },
    '-=0.6'
  );
};
