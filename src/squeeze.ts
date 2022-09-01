import { stepError } from '$anim/chatbotStepError';
import { updateAnswer } from '$anim/chatbotUpdateAnswer';
import { updateQuestion } from '$anim/chatbotUpdateQuestion';
import { chatbotJSON } from '$utils/generateChatbotJSON';
import { chatFormPost } from '$utils/postChatForm';

window.Webflow ||= [];
window.Webflow.push(() => {
  // ----------------------
  // Squeeze Page - Chatbot
  // ----------------------
  const chatbotQuestions = document.querySelectorAll('.chatbot-message_quesiton.question');
  const chatbotAnswers = document.querySelectorAll('.chatbot-message_quesiton.answer');
  const chatbotAnswerField = document.querySelectorAll('.form-text-area.chatbot');

  let chatProgression = 0;

  const initialQuestion = chatbotQuestions[0] as HTMLElement;
  updateQuestion(initialQuestion);

  const chatArea = document.querySelector('.chatbot_message-area') as HTMLElement;
  chatArea.scrollTop = chatArea.scrollHeight;

  document.querySelector('#chatbotSend')?.addEventListener('click', () => {
    const curFormField = chatbotAnswerField[chatProgression] as HTMLInputElement;
    const nextFormField = chatbotAnswerField[chatProgression + 1] as HTMLInputElement;
    const currentAnswerElement = chatbotAnswers[chatProgression] as HTMLElement;

    if (chatProgression <= chatbotAnswers.length - 2) {
      if (curFormField.value !== '') {
        chatProgression += 1;
        updateAnswer(currentAnswerElement, curFormField, nextFormField);
        updateQuestion(chatbotQuestions[chatProgression] as HTMLElement);
      } else {
        stepError(curFormField);
      }
    } else if (chatProgression === chatbotAnswers.length - 1) {
      if (curFormField.value !== '') {
        chatProgression += 1;
        updateAnswer(currentAnswerElement, curFormField, nextFormField);
        updateQuestion(chatbotQuestions[chatProgression] as HTMLElement);
        const submitChat = document.querySelector('#chatbotSubmit') as HTMLElement;
        submitChat.click();
      } else {
        stepError(curFormField);
      }
    } else {
      console.log('chat end');
    }
  });

  const chatbotForm = document.querySelector('#chatbotForm');
  chatbotForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const chatJSON = chatbotJSON(formData);

    chatFormPost(chatJSON, target);
  });
});
