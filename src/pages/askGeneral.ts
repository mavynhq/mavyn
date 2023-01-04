import { navTransition } from '$motion/navTransition';
import { postChatAI, generateChatElement } from '$utils/chatbotUtils';

export const askGeneral = () => {
  // ------------------
  // Page Globals
  // ------------------
  // set navbar animation
  // ---------------------
  const hasVideoBG = true;
  const navScrollSection = document.querySelector('.section_services-hero')?.className as string;
  setTimeout(() => {
    navTransition(navScrollSection, hasVideoBG);
  }, 100);

  // ------------------
  // Chatbot
  // ------------------
  const initialAIMessage = 'Hello, I am an AI design by Mavyn. What can I help you with today?';
  generateChatElement('ai', initialAIMessage, 'prompt');

  // form submission
  const chatSubmit = document.querySelector('#generalChatSend') as HTMLElement;
  chatSubmit?.addEventListener('click', () => {
    const chatFormInput = document.querySelector('#generalChatInput') as HTMLInputElement;
    const humanResponce = chatFormInput.value as string;

    generateChatElement('human', humanResponce, 'prompt');
    chatFormInput.value = '';

    postChatAI(humanResponce);
  });

  // Enter to submit
  document.querySelector('#generalChatInput')?.addEventListener('keypress', (e) => {
    const keyEvent = e as KeyboardEvent;
    const keyPressed = keyEvent.key;
    if (keyPressed === 'Enter') {
      e.preventDefault();

      chatSubmit.click();
    }
  });
};
