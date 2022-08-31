export const chatbotJSON = (form: FormData) => {
  const questionsList = document.querySelectorAll('.text-size-small.question');
  const typesList = document.querySelectorAll('.chatbot-message_type');

  const data = {
    slug: document.querySelector('.section-page-tag')?.innerHTML.toLocaleLowerCase(),
    chatQuestions: [...questionsList.entries()].map((dataObject, index) => ({
      text: dataObject[1].innerHTML,
      type: typesList[index].innerHTML,
    })),
    answers: [...form.entries()].map((obj) => {
      return obj[1];
    }),
  };

  const finalData = JSON.stringify(data);
  return finalData;
};
