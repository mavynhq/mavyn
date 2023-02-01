import { chatReveal, updateChatPostion, switchChatbot } from '$motion/chatbotMotion';

import { aiChatbot } from './chatbot';

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
  category: document.querySelector('.section-page-tag')?.innerHTML.toLocaleLowerCase(),
  tid: '1375826063',
  dev: true,
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
  category: string;
  dev: boolean;
}) => {
  ledger.chatLog = input.chat_log;
  ledger.id = input.id;
  ledger.seqnum = input.seqnum;
  ledger.image = input.image;
  ledger.category = input.category;
  ledger.dev = input.dev;

  if (ledger.image === 1) {
    sessionImage.push(input.answer);
  }
};

export const updateTID = (input: string) => {
  ledger.tid = input;
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
    if (message !== '') {
      newElement.children[0].children[0].innerHTML = message;
    }
  }
  if (message.includes('https')) {
    const imgSrc = sessionImage[sessionImage.length - 1];
    const imgObj = document.createElement('img');
    imgObj.src = imgSrc;
    imgObj.classList.add('ai_image');
    imgObj.classList.add('chatbot-message_image');

    newElement = cloneTemplate('rich');
    newElement.children[0].children[0].append(imgObj);

    // console.log('img obj:', imgObj);

    // let imgClicked = false;
    // imgObj.addEventListener('click', () => {
    //   imgClicked = !imgClicked;
    //   // console.log('click');
    //   if (imgClicked === true) {
    //     // console.log(imgObj.parentNode?.parentNode);
    //   } else if (imgClicked === false) {
    //   }
    // });
  }
  // console.log('NE', newElement);
  chatArea?.append(newElement);
  chatReveal(newElement);
  updateChatPostion();

  return newElement;
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
  const waitAITemplate = document.querySelector(
    '.chatbot-message_container.is-wait'
  ) as HTMLElement;

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
  } else if (type === 'wait') {
    newElement = waitAITemplate.cloneNode(true) as HTMLElement;
  }
  return newElement;
}

// -----------------------
// generate switch element
// -----------------------
export const executeChatSwitch = () => {
  const chatArea = document.querySelector('.chatbot_message-component');
  const expertChatButton = document.querySelector('#aiExpertButton') as HTMLElement;

  const chatSwitchElement = cloneTemplate('switch');
  chatArea?.append(chatSwitchElement);
  switchChatbot(chatSwitchElement);
  updateChatPostion();

  expertChatButton.style.display = 'block';
  expertChatButton.addEventListener('click', () => {
    postAIExit();
    // successRedirect();
  });
};

// ------------------------
// Post Chat Data - Hubspot
// ------------------------
export const postChatHS = (
  questions: {
    text: string;
    type: string;
  }[],
  answers: string[],
  target: HTMLFormElement,
  useAIChat: boolean
) => {
  const hsPayload = {
    slug: document.querySelector('.section-page-tag')?.innerHTML.toLocaleLowerCase(),
    chatQuestions: questions,
    answers: answers,
  };
  const json = JSON.stringify(hsPayload);

  const autofillAnswer = answers[0];

  function postData(): Promise<{ hubspotId: string }> {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: target.action,
        method: 'POST',
        data: json,
        contentType: 'application/json',
        beforeSend: () => {
          setTimeout(() => {
            generateChatElement('ai', 'Please wait...', 'prompt');
          }, 500);
        },
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
    .then(async (result) => {
      // console.log('RESULT', result);
      const tid = result.hubspotId;

      const parent = target.parentElement;
      const formEle = parent?.querySelector('form') as HTMLElement;
      const wfDone = parent?.querySelector('.w-form-done') as HTMLElement;

      updateTID(tid);

      if (useAIChat === true) {
        executeChatSwitch();
        await timeout(1000);
        aiChatbot();
        const aiInput = document.querySelector('#aiChatInput') as HTMLInputElement;
        const chatSend = document.querySelector('#chatbotSend') as HTMLElement;
        aiInput.value = autofillAnswer;
        chatSend.click();
      } else {
        formEle.style.display = 'none';
        wfDone.style.display = 'block';
        successRedirect();
      }
    })
    .catch(() => {
      // console.log('ERROR', error);
      $(target).css('display', 'none').siblings('.w-form-fail').css('display', 'block');
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

  const aiPayload = {
    question: chatAnswer,
    chatLog: ledger.chatLog,
    id: ledger.id,
    seqnum: ledger.seqnum,
    category: ledger.category,
    tid: ledger.tid,
    dev: true,
  };

  const json = JSON.stringify(aiPayload);

  function postData(): Promise<{
    answer: string;
    chat_log: string;
    id: number;
    image: number;
    seqnum: number;
    category: string;
    tid: number;
    dev: boolean;
  }> {
    return new Promise((resolve, reject) => {
      let tempWaitUI: HTMLElement;
      $.ajax({
        type: 'POST',
        url: finalEndpoint,
        data: json,
        contentType: 'application/json',
        beforeSend: () => {
          setTimeout(() => {
            tempWaitUI = generateChatElement('wait', '', '') as HTMLElement;
          }, 500);
        },
        success: function (result) {
          tempWaitUI.remove();
          resolve(result);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }
  postData()
    .then(async (result) => {
      // console.log('AI RESULT ', result);
      const rMessage = result.answer;
      updateLedger(result);
      await timeout(200);
      generateChatElement('ai', rMessage, 'answer');
    })
    .catch((error) => {
      // console.log('error', error);
      generateChatElement('ai', 'We aplogize, there was an error!' + error, 'error');
    });
};

// --------------------
// Post HS ticket id
// when AI exited
// ---------------------
export const postAIExit = () => {
  const apiEnndpoint = 'https://mavyn-py-api.herokuapp.com/api/exitai';
  const payLoad = { tid: ledger.tid };
  const json = JSON.stringify(payLoad);

  $.ajax({
    type: 'POST',
    url: apiEnndpoint,
    data: json,
    contentType: 'application/json',
    success: () => {
      successRedirect();
    },
    error: () => {
      successRedirect();
    },
  });
};

// --------------------
// Form Checking
// ---------------------
export const validateEmail = (email: string) => {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

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
