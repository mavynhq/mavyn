import { navTransition } from '$motion/navTransition';
import { expertJSON } from '$utils/generateExpertJSON';
import { expertFormPost } from '$utils/postExpertForm';

export const recruitment = () => {
  console.log('recruit');

  // set navbar animation
  // ---------------------
  const hasVideoBG = false;
  const navScrollSection = document.querySelector('.section_recruit-hero')?.className as string;
  setTimeout(() => {
    navTransition(navScrollSection, hasVideoBG);
  }, 1000);

  // expert form
  const expertForm = document.querySelector('.recruit-form_form') as HTMLElement;

  expertForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);

    const expertFormJSON = expertJSON(formData, target);
    expertFormPost(expertFormJSON, target);
  });
};
