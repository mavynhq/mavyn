export const chatFormPost = (data: string, target: HTMLFormElement) => {
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
      window.open('https://ask.mavyn.com/thank-you', '_blank');
    },
    error: function () {
      // alert('error on the form submitting', data);
      $(target).css('display', 'none').siblings('.w-form-fail').css('display', 'block');
    },
  });
};
