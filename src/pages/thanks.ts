import { navTransition } from '$motion/navTransition';

export const thanks = () => {
  // ------------------
  // Page Globals
  // ------------------

  // set navbar animation
  // ---------------------
  const hasVideoBG = false;
  const navScrollSection = document.querySelector('.section_thanks-main')?.className as string;
  setTimeout(() => {
    navTransition(navScrollSection, hasVideoBG);
  }, 100);

  // Set thank you text
  // based on hours open
  // ---------------------
  const inHours = document.querySelector('#thanksInHours') as HTMLElement;
  const outHours = document.querySelector('#thanksOutHours') as HTMLElement;

  const date1 = new Date('February 1, 2023 21:00:00 GMT-07:00');

  const userTime = new Date();
  const utcHour = userTime.getUTCHours();
  const cstHour = convertCST(utcHour);

  console.log(
    'USER time:',
    userTime.getHours(),
    '\n',
    'UTC time:',
    utcHour,
    '\n',
    'CST time:',
    cstHour
  );

  if (cstHour >= 8 && cstHour <= 22) {
    console.log('in business hours');
    outHours.style.display = 'none';
  } else {
    console.log('out business hours');
    inHours.style.display = 'none';
  }

  function convertCST(utc: number) {
    const lowerLimit = 0;
    const uppperLimit = 24;

    const tempTime = utc - 6;
    let returnTime = 0;

    if (tempTime < lowerLimit) {
      const diff = Math.abs(tempTime);
      returnTime = uppperLimit - diff;
    } else {
      returnTime = tempTime;
    }

    return returnTime;
  }
};
