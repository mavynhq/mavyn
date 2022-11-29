import { clearError } from 'src/motion/chatbotClearError';
import { stepError } from 'src/motion/chatbotStepError';
import { updateAnswer } from 'src/motion/chatbotUpdateAnswer';
import { updateQuestion } from 'src/motion/chatbotUpdateQuestion';

import { navTransition } from '$anim/navTransition';
import { chatbotJSON } from '$utils/generateChatbotJSON';
import { getChatQuestions } from '$utils/getChatbotQuestions';
import { chatFormPost } from '$utils/postChatForm';
import { querySelectorAlltoArray } from '$utils/querySelectorAlltoArray';
import { validateEmail } from '$utils/validateEmail';
import { isValidPhoneFormat } from '$utils/validatePhone';

export const squeeze = () => {
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
  const expectedAamount = document.querySelectorAll('.chatbot-message_quesiton.answer').length - 1;
  const answers: string[] = [];
  const sendButton = document.querySelector('#chatbotSend') as HTMLElement;

  updateQuestion(answers.length - 1);

  // Autofill first question
  const autoQuestions = querySelectorAlltoArray('.side-collection_item');

  for (let i = 0; i <= autoQuestions.length - 1; i++) {
    const curAQ = autoQuestions[i] as HTMLElement;

    curAQ.addEventListener('click', (e) => {
      // if (answers.length > 0) {
      //   console.log('has entered info');
      // } else {
      //   console.log('has not entered info');
      // }
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
  document.querySelector('#chatbotSend')?.addEventListener('click', () => {
    const answerIndex = answers.length;
    const isEmailQuestion = questions[answerIndex]?.type === 'email';
    const isPhoneQuestion = questions[answerIndex]?.type === 'phone';
    const isPromptQuestion = answerIndex === 0;

    const curFormField = document.querySelectorAll('.chatbot_text-area.chatbot')[
      answerIndex
    ] as HTMLInputElement;

    const answerText = curFormField.value.trim();

    // checks
    if (isPromptQuestion && answerText.length < PROMPT_MIN_CHARACTERS) {
      stepError(answerIndex, PROMPT_ERROR_STRING);
      return;
    }
    if (isEmailQuestion && !validateEmail(answerText)) {
      stepError(answerIndex, EMAIL_ERROR_STRING);
      return;
    }
    if (isPhoneQuestion && !isValidPhoneFormat(answerText)) {
      stepError(answerIndex, PHONE_ERROR_STRING);
      return;
    }
    if ((answerText || '').trim().length === 0) {
      stepError(answerIndex, PROMPT_ERROR_NO_ANSWER);
      return;
    }

    if (answerIndex === expectedAamount) {
      answers.push(answerText);
      const submitChat = document.querySelector('#chatbotSubmit') as HTMLElement;
      submitChat.click();
    }

    answers.push(answerText);
    updateAnswer(answerText, answerIndex);
    updateQuestion(answerIndex);
    clearError();
  });

  const chatForms = document.querySelectorAll('.chatbot_text-area.chatbot');
  for (let i = 0; i < chatForms.length; i++) {
    const curForm = chatForms[i] as HTMLElement;
    curForm.addEventListener('keypress', (e) => {
      const keyEvent = e as KeyboardEvent;
      const keyPressed = keyEvent.key;
      if (keyPressed === 'Enter') {
        e.preventDefault();

        sendButton.click();
      }
    });
  }

  const chatbotForm = document.querySelector('#chatbotForm');
  chatbotForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const chatJSON = chatbotJSON(questions, answers);

    chatFormPost(chatJSON, target);
  });

  // -----------------------------
  // Hide un-initialized elements
  // -----------------------------

  // Testimonials
  const testimonialsSection = document.querySelector(
    '.section_services-testimonials'
  ) as HTMLElement;
  const testitems = querySelectorAlltoArray('.services-testimonials_item');

  if (testitems.length === 0) {
    testimonialsSection.style.display = 'none';
  }

  // Autofill questions
  const autoFillSection = document.querySelector('.side-content_collection') as HTMLElement;

  if (autoQuestions.length === 0) {
    autoFillSection.style.display = 'none';
  }
};
