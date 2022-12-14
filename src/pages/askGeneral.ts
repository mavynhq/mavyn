import { navTransition } from '$motion/navTransition';
import { generalAskPost, generateChatElement } from '$utils/chatbotUtils';

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

  const aiDelim = 'AI: ';
  const humanDelim = 'Human: ';
  const initialMessage = 'Hello, I am an AI design by Mavyn. What can I help you with today?';
  let chatLog: string = aiDelim + initialMessage + ' ';

  generateChatElement('ai', initialMessage);

  // form submission
  const chatSubmit = document.querySelector('#generalChatSend') as HTMLElement;
  chatSubmit?.addEventListener('click', () => {
    const chatFormInput = document.querySelector('#generalChatInput') as HTMLInputElement;
    const humanResponce = chatFormInput.value as string;

    generateChatElement('human', humanResponce);

    const updatedChatlog = chatLog + humanDelim + humanResponce + ' ';
    chatLog = updatedChatlog;

    chatFormInput.value = '';

    generalAskPost(humanResponce, chatLog);
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
