export const getChatQuestions = () => {
  const questionsList = document.querySelectorAll('.text-size-small.question');
  const typesList = document.querySelectorAll('.chatbot-message_type');

  const questions = [...questionsList.entries()].map((dataObject, index) => ({
    text: dataObject[1].innerHTML,
    type: typesList[index].innerHTML,
  }));

  return questions;
};
