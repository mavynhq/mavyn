import { chatStepError, chatClearError } from '$motion/chatbotMotion';
import {
  getChatQuestions,
  generateChatElement,
  validateEmail,
  isValidPhoneFormat,
  generateHubpotJSON,
  postChatHS,
} from '$utils/chatbotUtils';
import { querySelectorAlltoArray } from '$utils/querySelectorAlltoArray';

export const chatbot = () => {
  // ----------------------
  // Chatbot
  // ----------------------
  const PROMPT_MIN_CHARACTERS = 10;
  const EMAIL_ERROR_STRING =
    'Please enter a valid email address. Use the format example@test.com without any other characters.';
  const PHONE_ERROR_STRING = 'Please enter a valid phone number. Example format: 123-555-5555';
  const PROMPT_ERROR_STRING = `Your description must be at least ${PROMPT_MIN_CHARACTERS} characters.`;
  const PROMPT_ERROR_NO_ANSWER = 'Please provide response to continue';

  const questions = getChatQuestions();
  const expectedAamount = questions.length - 2;
  const answers: string[] = [];

  const sendButton = document.querySelector('#chatbotSend') as HTMLElement;
  const chatInput = document.querySelector('.chatbot_text-area.chatbot') as HTMLInputElement;

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
        sendButton.click();
      }
    });
  }

  // Chatbot send
  sendButton.addEventListener('click', () => {
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
      const contactType = answers[2];

      if (contactType === 'AI Chat') {
        const contactUI = generateChatElement(
          'contact',
          'Do you wish to continue with AI',
          'prompt'
        );
        // console.log('UI', contactUI);
      }

      const submitChat = document.querySelector('#chatbotSubmit') as HTMLElement;
      submitChat.click();
    }

    chatClearError();
  });

  chatInput.addEventListener('keypress', (e) => {
    const keyEvent = e as KeyboardEvent;
    const keyPressed = keyEvent.key;
    if (keyPressed === 'Enter') {
      e.preventDefault();

      sendButton.click();
    }
  });

  const chatbotForm = document.querySelector('#chatbotForm');
  chatbotForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const chatJSON = generateHubpotJSON(questions, answers);

    postChatHS(chatJSON, target);
  });
};
