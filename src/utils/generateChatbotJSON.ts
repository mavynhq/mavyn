export const chatbotJSON = (form: FormData) => {
  // const questions: Element[] = document.querySelectorAll('.chatbot-message_quesiton.question');
  const data = {
    slug: document.querySelector('.section-page-tag')?.innerHTML,
    chatQuestions: [...document.querySelectorAll('.text-size-small.question').entries()].map(
      (obj) => ({
        text: obj[1].innerHTML,
        type: 'propmpt',
      })
    ),

    answers: [...form.entries()].map((obj) => {
      return obj[1];
    }),
  };

  console.log(data);
};
