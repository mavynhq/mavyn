export const chatbotJSON = (
  questions: {
    text: string;
    type: string;
  }[],
  answers: string[]
) => {
  const data = {
    slug: document.querySelector('.section-page-tag')?.innerHTML.toLocaleLowerCase(),
    chatQuestions: questions,
    answers: answers,
  };

  const finalData = JSON.stringify(data);
  return finalData;
};
