import { chatReveal, updateChatPostion } from '$motion/chatbotMotion';

// Chatlog
let chatLog = 'AI: Hello, I am an AI design by Mavyn. What can I help you with today?';

export const getChatLog = () => {
  return chatLog;
};

export const updateChatLog = (input: string) => {
  chatLog = input;
  // console.log('updated Chat', chatLog);
};

// generate chat element
export const generateChatElement = (type: string, message: string) => {
  const chatParents = document.querySelectorAll('.chatbot-message_container');
  const aiTemplate = chatParents[0];
  const humanTemplate = chatParents[1];

  let newElement: HTMLElement = aiTemplate as HTMLElement;

  const chatArea = document.querySelector('.chatbot_message-component');

  if (type === 'ai') {
    newElement = aiTemplate.cloneNode(true) as HTMLElement;
  } else if (type === 'human') {
    newElement = humanTemplate.cloneNode(true) as HTMLElement;
  }

  newElement.children[0].children[0].innerHTML = message;
  chatArea?.append(newElement);
  chatReveal(newElement);
  updateChatPostion();

  return newElement;
};

// API Call
export const generalAskPost = (chatAnswer: string, chatlog: string) => {
  const chatFormElement = document.querySelector('#generalChatForm')
    ?.children[0] as HTMLFormElement;
  const apiEndpoint = chatFormElement.action;
  const data = {
    question: chatAnswer,
    chatLog: chatlog,
  };
  const json = JSON.stringify(data);

  function postData(): Promise<{ answer: string; chat_log: string }> {
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
      const message = result.answer;
      const chatLog = result.chat_log;
      updateChatLog(chatLog);
      generateChatElement('ai', message);
    })
    .catch((error) => {
      // console.log('error', error);
      generateChatElement('ai', 'We aplogize, there was an error!' + error);
    });
};
