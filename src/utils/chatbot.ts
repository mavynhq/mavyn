import { chatStepError, chatClearError } from '$motion/chatbotMotion';
import {
  getChatQuestions,
  generateChatElement,
  validateEmail,
  isValidPhoneFormat,
  postChatHS,
  postChatAI,
  timeout,
} from '$utils/chatbotUtils';
import { querySelectorAlltoArray } from '$utils/querySelectorAlltoArray';

// ---------------
// Hubspot Chatbot
// ---------------
export const chatbot = () => {
  const PROMPT_MIN_CHARACTERS = 10;
  const EMAIL_ERROR_STRING =
    'Please enter a valid email address. Use the format example@test.com without any other characters.';
  const PHONE_ERROR_STRING = 'Please enter a valid phone number. Example format: 123-555-5555';
  const PROMPT_ERROR_STRING = `Your description must be at least ${PROMPT_MIN_CHARACTERS} characters.`;
  const PROMPT_ERROR_NO_ANSWER = 'Please provide response to continue';

  const questions = getChatQuestions();
  const expectedAamount = questions.length - 2;
  const answers: string[] = [];
  const loadAIQuestion = document.querySelector('.section-ai-tag')?.innerHTML.toLocaleLowerCase();
  console.log(loadAIQuestion);
  let useAIChat = false;

  const chatSend = document.querySelector('#chatbotSend') as HTMLElement;
  const chatInput = document.querySelector('#chatInput') as HTMLInputElement;

  generateChatElement('ai', questions[0].text, questions[0].type);

  // Autofill first question
  const autoQuestions = querySelectorAlltoArray('.side-collection_item');

  for (let i = 0; i <= autoQuestions.length - 1; i++) {
    const curAQ = autoQuestions[i] as HTMLElement;

    curAQ.addEventListener('click', (e) => {
      const clickedElement = e.target as HTMLElement;
      const autofillText = clickedElement.children[0].innerHTML as string;
      const autoFillArea = querySelectorAlltoArray(
        '.chatbot_text-area.chatbot'
      )[0] as HTMLInputElement;

      autoFillArea.value = autofillText;

      if (answers.length === 0) {
        chatSend.click();
      }
    });
  }

  // Chatbot send
  chatSend.addEventListener('click', async () => {
    const answerIndex = answers.length;
    const isEmailQuestion = questions[answerIndex]?.type === 'email';
    const isPhoneQuestion = questions[answerIndex]?.type === 'phone';
    const isPromptQuestion = answerIndex === 0;

    const answerText = chatInput.value.trim();

    // checks
    if (isPromptQuestion && answerText.length < PROMPT_MIN_CHARACTERS) {
      chatStepError(answerIndex, PROMPT_ERROR_STRING);
      return;
    }
    if (isEmailQuestion && !validateEmail(answerText)) {
      chatStepError(answerIndex, EMAIL_ERROR_STRING);
      return;
    }
    if (isPhoneQuestion && !isValidPhoneFormat(answerText)) {
      chatStepError(answerIndex, PHONE_ERROR_STRING);
      return;
    }
    if ((answerText || '').trim().length === 0) {
      chatStepError(answerIndex, PROMPT_ERROR_NO_ANSWER);
      return;
    }

    if (answerIndex <= expectedAamount - 1) {
      answers.push(answerText);
      generateChatElement('human', answerText, 'answer');
      chatInput.value = '';

      setTimeout(() => {
        generateChatElement('ai', questions[answerIndex + 1].text, questions[answerIndex + 1].type);
      }, 1000);
    }

    if (answerIndex === expectedAamount) {
      answers.push(answerText);
      generateChatElement('human', answerText, 'phone');

      chatInput.value = '';

      const submitChat = document.querySelector('#chatbotSubmit') as HTMLElement;

      if (loadAIQuestion === 'enabled') {
        await timeout(1000);
        const contactUI = generateChatElement(
          'contact',
          'Would you like to chat with our AI now to help solve the problem?',
          'prompt'
        ) as HTMLElement;

        const buttonElements = contactUI.children[1].children[0].childNodes;

        for (let i = 0; i < buttonElements.length; i++) {
          const temp = buttonElements[i] as HTMLElement;

          if (i === 0) {
            temp.children[0].innerHTML = 'Yes';
          } else if (i === 1) {
            temp.children[0].innerHTML = 'No';
          } else {
            temp.style.display = 'none';
          }

          temp.addEventListener('click', async (e) => {
            const buttonClicked = e.target as HTMLElement;
            const buttonText = buttonClicked.children[0].innerHTML;

            if (buttonText === 'Yes') {
              useAIChat = true;
              // chatInput.value = '';
              generateChatElement('human', 'Yes', '');
              submitChat.click();
            } else {
              chatInput.value = '';
              generateChatElement('human', 'No', '');
              submitChat.click();
            }
          });
        }
      } else {
        chatInput.value = '';
        submitChat.click();
      }
    }
    chatClearError();
  });

  chatInput.addEventListener('keypress', (e) => {
    const keyEvent = e as KeyboardEvent;
    const keyPressed = keyEvent.key;
    if (keyPressed === 'Enter') {
      e.preventDefault();

      chatSend.click();
    }
  });

  const chatbotForm = document.querySelector('#chatbotForm');
  chatbotForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    postChatHS(questions, answers, target, useAIChat);
  });
};

// ---------------
// AI Chatbot
// ---------------
export const aiChatbot = () => {
  const initialAIMessage = 'Hello, I am an AI design by Mavyn. What can I help you with today?';
  generateChatElement('ai', initialAIMessage, 'prompt');

  const chatSend = document.querySelector('#chatbotSend') as HTMLElement;
  const chatInput = document.querySelector('#aiChatInput') as HTMLInputElement;

  // form submission
  chatSend?.addEventListener('click', () => {
    const humanResponce = chatInput.value as string;

    generateChatElement('human', humanResponce, 'prompt');
    chatInput.value = '';

    postChatAI(humanResponce);
  });

  // Enter to submit
  document.querySelector('#aiChatInput')?.addEventListener('keypress', (e) => {
    const keyEvent = e as KeyboardEvent;
    const keyPressed = keyEvent.key;
    if (keyPressed === 'Enter') {
      e.preventDefault();

      chatSend.click();
    }
  });
};
