import { clearError } from '$anim/chatbotClearError';
import { stepError } from '$anim/chatbotStepError';
import { updateAnswer } from '$anim/chatbotUpdateAnswer';
import { updateQuestion } from '$anim/chatbotUpdateQuestion';
import { chatbotJSON } from '$utils/generateChatbotJSON';
import { getChatQuestions } from '$utils/getChatbotQuestions';
import { chatFormPost } from '$utils/postChatForm';
import { validateEmail } from '$utils/validateEmail';
import { isValidPhoneFormat } from '$utils/validatePhone';

window.Webflow ||= [];
window.Webflow.push(() => {
  // ----------------------
  // Squeeze Page - Chatbot
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

  updateQuestion(answers.length - 1);

  document.querySelector('#chatbotSend')?.addEventListener('click', () => {
    const answerIndex = answers.length;
    const isEmailQuestion = questions[answerIndex]?.type === 'email';
    const isPhoneQuestion = questions[answerIndex]?.type === 'phone';

    const isPromptQuestion = answerIndex === 0;

    const curFormField = document.querySelectorAll('.chatbot_text-area.chatbot')[
      answerIndex
    ] as HTMLInputElement;
    const answerText = curFormField.value.trim();

    if (isPromptQuestion && answerText.length < PROMPT_MIN_CHARACTERS) {
      stepError(answerIndex, PROMPT_ERROR_STRING);
      // alert(PROMPT_ERROR_STRING);
      return;
    }
    if (isEmailQuestion && !validateEmail(answerText)) {
      stepError(answerIndex, EMAIL_ERROR_STRING);
      // alert(EMAIL_ERROR_STRING);
      return;
    }
    if (isPhoneQuestion && !isValidPhoneFormat(answerText)) {
      stepError(answerIndex, PHONE_ERROR_STRING);
      // alert(PHONE_ERROR_STRING);
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
        const sendButton = document.querySelector('#chatbotSend') as HTMLElement;
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
});
