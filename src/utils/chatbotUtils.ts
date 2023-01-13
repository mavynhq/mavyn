// import { gtag } from 'ga-gtag';
import { chatReveal, updateChatPostion, switchChatbot } from '$motion/chatbotMotion';

// -------------------------
// Static Chatbot Questions
// -------------------------
export const getChatQuestions = () => {
  const questionList = document.querySelectorAll('.questions_text');
  const typesList = document.querySelectorAll('.questions_type');

  const questions = [...questionList.entries()].map((dataObject, index) => ({
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

export const timeout = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

// ---------------------
// generate chat element
// ---------------------
export const generateChatElement = (uiType: string, message: string, msgType: string) => {
  let newElement;
  const chatArea = document.querySelector('.chatbot_message-component');

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

    newElement = cloneTemplate('rich');
    newElement.children[0].children[0].append(imgObj);
  }
  // console.log('NE', newElement);
  chatArea?.append(newElement);
  chatReveal(newElement);
  updateChatPostion();

  return newElement;
};

// -----------------------
// generate switch element
// -----------------------
export const executeChatSwitch = () => {
  const chatArea = document.querySelector('.chatbot_message-component');

  const chatSwitchElement = cloneTemplate('switch');
  chatArea?.append(chatSwitchElement);
  switchChatbot(chatSwitchElement);
  updateChatPostion();
};

// ---------------------
// Clone UI Template
// ---------------------
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
  const buttonTemplate = document.querySelector(
    '.chatbot-message_container.has-buttons'
  ) as HTMLElement;
  const switchTemplate = document.querySelector('.chatbot-message_seperator') as HTMLElement;

  let newElement: HTMLElement = aiTemplate as HTMLElement;

  if (type === 'ai') {
    newElement = aiTemplate.cloneNode(true) as HTMLElement;
  } else if (type === 'human') {
    newElement = humanTemplate.cloneNode(true) as HTMLElement;
  } else if (type === 'rich') {
    newElement = richTextTemplate.cloneNode(true) as HTMLElement;
  } else if (type === 'contact') {
    newElement = buttonTemplate.cloneNode(true) as HTMLElement;
    const selectElements = newElement.children[1].children[0].children;
    const chatInput = document.querySelector('.chatbot_text-area.chatbot') as HTMLInputElement;
    const sendButton = document.querySelector('#chatbotSend') as HTMLElement;

    for (let i = 0; i < selectElements.length; i++) {
      const temp = selectElements[i] as HTMLElement;
      temp.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const valuePass = target.children[0].innerHTML;

        chatInput.value = valuePass;
        sendButton.click();
      });
    }
  } else if (type === 'switch') {
    newElement = switchTemplate.cloneNode(true) as HTMLElement;
  }
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
export const postChatHS = (data: string, target: HTMLFormElement, useAIChat: boolean) => {
  $.ajax({
    url: target.action,
    method: 'POST',
    data: data,
    contentType: 'application/json',
    success: function () {
      const parent = target.parentElement;
      const formEle = parent?.querySelector('form') as HTMLElement;
      const wfDone = parent?.querySelector('.w-form-done') as HTMLElement;

      if (useAIChat === true) {
        console.log('trigger conversion method');
        gtagConversion(window.location);
      } else {
        formEle.style.display = 'none';
        wfDone.style.display = 'block';
        successRedirect();
      }
    },
    error: function () {
      // alert('error on the form submitting', data);
      $(target).css('display', 'none').siblings('.w-form-fail').css('display', 'block');
    },
  });
};

function successRedirect() {
  window.location.href = 'https://www.mavyn.com/thank-you';
}

// --------------------
// Post Chat Data - AI
// ---------------------
export const postChatAI = (chatAnswer: string) => {
  const chatFormElement = document.querySelector('.chatbot_form')?.children[0] as HTMLFormElement;
  const formEndpoint = chatFormElement.action;
  const aiEndpoint = 'https://mavyn-py-api.herokuapp.com/api/logmsgai';
  let finalEndpoint = '';

  if (formEndpoint !== aiEndpoint) {
    finalEndpoint = aiEndpoint;
  } else {
    finalEndpoint = formEndpoint;
  }

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
        url: finalEndpoint,
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

// ----------------------------
// Google Ad Coversion Tracking
// ----------------------------
export const gtagConversion = (url: Location) => {
  console.log('GTAG', url);
  const callback = function () {
    if (typeof url !== 'undefined') {
      console.log('conversion successful');
      // window.location = url;
    }
  };
  gtag('event', 'conversion', {
    send_to: 'AW-10790538557/r6DBCICbhogYEL2aqpko',
    event_callback: callback,
  });
  return false;
};
