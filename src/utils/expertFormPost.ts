export const expertFormPost = (data: string, target: HTMLFormElement) => {
  $.ajax({
    url: target.action,
    method: 'POST',
    data: data,
    contentType: 'application/json',
    success: function (response) {
      if (response) {
        if (response.inlineMessage) {
          const parent = $(target).parent();
          parent.children('form').css('display', 'none');
          parent.children('.w-form-done').css('display', 'block').html(response.inlineMessage);
        } else if (response.redirectUri) {
          window.location.href = response.redirectUri;
        }
      } else {
        // console.log('response but no inlineMessage or redirectUri');
      }
    },
    error: function () {
      //   console.log('error on the form submitting', data);
      $(target).css('display', 'none').siblings('.w-form-fail').css('display', 'block');
    },
  });
};
