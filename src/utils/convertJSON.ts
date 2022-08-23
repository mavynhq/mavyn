export const convertJSON = (form: JQuery<HTMLInputElement>) => {
  const array = $(form).serializeArray();
  const json: { [key: string]: string } = {};
  console.log('in converJSON');

  $.each(array, function () {
    json[this.name] = this.value || '';
  });

  return json;
};
