import { gsap } from 'gsap';

export const bookFormWait = () => {
  const formSlide02 = $('#bookFormSlide02');
  const formWaitElement = $('#formSubmitLoader');
  const formWaitChildren = formWaitElement.children();

  const formSubmitAnim = gsap.timeline({ paused: true });
  formSubmitAnim.to(formSlide02, {
    duration: 0.6,
    opacity: 0,
    ease: 'power3.inOut',
  });
  formSubmitAnim.to(formSlide02, { duration: 0, display: ' none' });
  formSubmitAnim.to(formWaitElement, { duration: 0, display: 'flex' });
  formSubmitAnim.from(formWaitChildren, {
    duration: 0.8,
    y: 16,
    opacity: 0,
    ease: 'power3,inOut',
  });

  return formSubmitAnim;
};
