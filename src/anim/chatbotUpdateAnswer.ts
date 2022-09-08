import { gsap } from 'gsap';

export const updateAnswer = (curText: string, curAnswer: number) => {
  const answersElements = document.querySelectorAll('.chatbot-message_quesiton.answer');
  const currentAnswerElement = answersElements[curAnswer] as HTMLElement;
  currentAnswerElement.children[0].innerHTML = curText;

  const chatbotAnswerForms = document.querySelectorAll('.form-text-area.chatbot');
  const curFormField = chatbotAnswerForms[curAnswer] as HTMLInputElement;
  const nextFormField = chatbotAnswerForms[curAnswer + 1] as HTMLInputElement;

  const chatArea = document.querySelector('.chatbot_message-area') as Element;

  const updateAnswerTimeline = gsap.timeline();
  updateAnswerTimeline.to(currentAnswerElement, {
    opacity: 1,
    y: 0,
    display: 'block',
    duration: 0.6,
    ease: 'Power4.easeInOut',
  });
  updateAnswerTimeline.to(curFormField, { display: 'none', duration: 0 }, '-=0.6');
  updateAnswerTimeline.to(nextFormField, { display: 'block', duration: 0 }, '-=0.6');

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
