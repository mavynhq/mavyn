import { getPublishDate } from '@finsweet/ts-utils';

export const greetUser = (name: string) => {
  const publishDate = getPublishDate();

  console.log(`Hello ${name}!`);
};
