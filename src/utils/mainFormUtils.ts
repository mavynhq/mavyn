import { formWait } from '$motion/mainFormMotion';

export const checkForm = (formStep: number) => {
  const formWrap = document.querySelectorAll('.booking-form_slider-component');
  const firstStep = formWrap[formStep] as HTMLElement;
  const stepInputs = firstStep.getElementsByClassName('form-input');
  const inputsValid = [];

  for (let i = 0; i < stepInputs.length; i++) {
    const input = stepInputs[i] as HTMLInputElement;
    if (input.value !== '') {
      inputsValid.push(true);
    } else {
      inputsValid.push(false);
    }
  }
  if (inputsValid.includes(false)) {
    return false;
  }

  return true;
};

export const convertFormData = (parse: HTMLFormElement) => {
  const formInputs = parse.elements;
  const dataObj: { [key: string]: string } = {};

  for (let i = 0; i < formInputs.length - 1; i++) {
    const temp = formInputs[i] as HTMLInputElement;
    let tempValue = temp.value;
    const tempName = temp.name;

    if (temp.name === 'category') {
      const formatted = tempValue.toLowerCase().replace(' ', '-');
      tempValue = formatted;
    }

    dataObj[tempName] = tempValue;
  }

  const json = JSON.stringify(dataObj);
  return json;
};

export const postFormData = (data: string, target: HTMLFormElement) => {
  $.ajax({
    url: target.action,
    method: 'POST',
    data: data,
    contentType: 'application/json',
    dataType: 'json',
    beforeSend: function () {
      const waitTimeline = formWait();
      waitTimeline.play();
    },
    success: function () {
      // const parent = target.parentElement;
      // const formEle = parent?.querySelector('form') as HTMLElement;
      // const wfDone = parent?.querySelector('.w-form-done') as HTMLElement;
      // formEle.style.display = 'none';
      // wfDone.style.display = 'block';
      window.location.href = 'https://www.mavyn.com/thank-you';
    },
    error: function (req, err) {
      console.log('req', req, 'error', err);
      $(target).css('display', 'none').siblings('.w-form-fail').css('display', 'block');
    },
  });
};
