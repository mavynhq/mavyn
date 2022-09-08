import { gsap } from 'gsap';

export const updateQuestion = (curAnswer: number) => {
  const chatbotQElements = document.querySelectorAll('.chatbot-message_quesiton.question');
  const currentAnswerElement = chatbotQElements[curAnswer + 1];
  const chatArea = document.querySelector('.chatbot_message-area') as Element;

  const revealElement = gsap.timeline();
  revealElement.to(currentAnswerElement, {
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
