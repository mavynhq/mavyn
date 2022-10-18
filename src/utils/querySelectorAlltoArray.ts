export const querySelectorAlltoArray = (className: string) => {
  const list = document.querySelectorAll(className);
  const array = [...list].map((item) => {
    return item;
  });
  return array;
};
