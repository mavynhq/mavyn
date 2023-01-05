import { chatReveal, updateChatPostion } from '$motion/chatbotMotion';

// -------------------------
// Static Chatbot Questions
// -------------------------
// test
export const getChatQuestions = () => {
  const questionsList = document.querySelectorAll('.questions_text');
  const typesList = document.querySelectorAll('.questions_type');

  const questions = [...questionsList.entries()].map((dataObject, index) => ({
    text: dataObject[1].innerHTML.replace(/<[^>]*>?/gm, ''),
    type: typesList[index].innerHTML,
  }));

  return questions;
};

// ------------------
// AI Chatlog
// ------------------
const sessionImage: string[] = [];
const ledger = {
  chatLog: 'AI: Hello, I am an AI design by Mavyn. What can I help you with today?',
  id: 0,
  seqnum: 0,
  image: 0,
};

export const getLedger = () => {
  return ledger;
};

export const updateLedger = (input: {
  answer: string;
  chat_log: string;
  id: number;
  image: number;
  seqnum: number;
}) => {
  ledger.chatLog = input.chat_log;
  ledger.id = input.id;
  ledger.seqnum = input.seqnum;
  ledger.image = input.image;

  if (ledger.image === 1) {
    sessionImage.push(input.answer);
  }
};

// ---------------------
// generate chat element
// ---------------------
export const generateChatElement = (uiType: string, message: string, msgType: string) => {
  let newElement;

  if (msgType === 'contact') {
    newElement = cloneTemplate(msgType);
  } else {
    newElement = cloneTemplate(uiType);
    newElement.children[0].children[0].innerHTML = message;
  }
  if (message.includes('https')) {
    const imgSrc = sessionImage[sessionImage.length - 1];
    const imgObj = document.createElement('img');
    imgObj.src = imgSrc;
    imgObj.classList.add('ai_image');

    newElement = cloneTemplate('contact');
    newElement.children[0].children[0].append(imgObj);
  }
  // console.log('NE', newElement);
  const chatArea = document.querySelector('.chatbot_message-component');
  chatArea?.append(newElement);
  chatReveal(newElement);
  updateChatPostion();
};

function cloneTemplate(type: string) {
  const aiTemplate = document.querySelector(
    '.chatbot-message_container.is-question'
  ) as HTMLElement;
  const humanTemplate = document.querySelector(
    '.chatbot-message_container.is-response'
  ) as HTMLElement;
  const richTextTemplate = document.querySelector(
    '.chatbot-message_container.is-rich-text'
  ) as HTMLElement;

  let newElement: HTMLElement = aiTemplate as HTMLElement;

  if (type === 'ai') {
    newElement = aiTemplate.cloneNode(true) as HTMLElement;
  } else if (type === 'human') {
    newElement = humanTemplate.cloneNode(true) as HTMLElement;
  } else if (type === 'contact') {
    newElement = richTextTemplate.cloneNode(true) as HTMLElement;
  }

  // console.log(newElement);
  return newElement;
}

// ------------------------------------------
// Generate JSON for chatbot post to Hubspot
// ------------------------------------------
export const generateHubpotJSON = (
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

// ------------------------
// Post Chat Data - Hubspot
// ------------------------
export const postChatHS = (data: string, target: HTMLFormElement) => {
  $.ajax({
    url: target.action,
    method: 'POST',
    data: data,
    contentType: 'application/json',
    success: function () {
      const parent = target.parentElement;
      const formEle = parent?.querySelector('form') as HTMLElement;
      const wfDone = parent?.querySelector('.w-form-done') as HTMLElement;
      formEle.style.display = 'none';
      wfDone.style.display = 'block';
      window.location.href = 'https://www.mavyn.com/thank-you';
    },
    error: function () {
      // alert('error on the form submitting', data);
      $(target).css('display', 'none').siblings('.w-form-fail').css('display', 'block');
    },
  });
};

// --------------------
// Post Chat Data - AI
// ---------------------
export const postChatAI = (chatAnswer: string) => {
  const chatFormElement = document.querySelector('#generalChatForm')
    ?.children[0] as HTMLFormElement;
  const apiEndpoint = chatFormElement.action;
  const data = {
    question: chatAnswer,
    chatLog: ledger.chatLog,
    id: ledger.id,
    seqnum: ledger.seqnum,
  };
  const json = JSON.stringify(data);

  function postData(): Promise<{
    answer: string;
    chat_log: string;
    id: number;
    image: number;
    seqnum: number;
  }> {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url: apiEndpoint,
        data: json,
        contentType: 'application/json',
        success: function (result) {
          resolve(result);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }
  postData()
    .then((result) => {
      // console.log('RESULT ', result);
      const rMessage = result.answer;
      updateLedger(result);
      generateChatElement('ai', rMessage, 'answer');
    })
    .catch((error) => {
      // console.log('error', error);
      generateChatElement('ai', 'We aplogize, there was an error!' + error, 'error');
    });
};

export const validateEmail = (email: string) => {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

// --------------------
// Form Checking
// ---------------------
export const trimNonDigits = (value: string) => {
  return value.replace(/[^\d]/g, '');
};

const MIN_NUMBER_OF_DIGITS = 10;
const MAX_NUMBER_OF_DIGITS = 11;

export const isValidPhoneFormat = (phone: string) => {
  const trimmedNumber = trimNonDigits(phone);
  return (
    trimmedNumber.length >= MIN_NUMBER_OF_DIGITS && trimmedNumber.length <= MAX_NUMBER_OF_DIGITS
  );
};
