import { formWait } from '$motion/mainFormMotion';

export const mainFormPost = (
  form: JQuery<HTMLInputElement>,
  endpoint: string,
  formData: { [key: string]: string }
) => {
  const data = JSON.stringify(formData);
  // console.log('DATA OLD', data);
  $.ajax({
    url: endpoint,
    method: 'POST',
    data: data,
    contentType: 'application/json',
    dataType: 'json',
    beforeSend: function () {
      const waitTimeline = formWait();
      waitTimeline.play();
    },
    success: function () {
      const parent = $(form.parent());
      // Hide the form
      parent.children('form').css('display', 'none');
      // Display the "Done" block
      parent.children('.w-form-done').css('display', 'block');
      window.location.href = 'https://www.mavyn.com/thank-you';
    },
    error: function (req, err) {
      console.log('req', req, 'error', err);
      const parent = $(form.parent());
      // Display the "Failed" block
      parent.find('.w-form-fail').css('display', 'block');
    },
  });
};
