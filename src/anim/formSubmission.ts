import { gsap } from 'gsap';

export const formSubmit = (formSlide02: HTMLElement, formSubmitChildren: HTMLElement) => {
  const formSubmitAnim = gsap.timeline({ paused: true });
  formSubmitAnim.to(formSlide02, {
    duration: 0.6,
    opacity: 0,
    ease: 'power3.inOut',
  });
  formSubmitAnim.to(formSlide02, { duration: 0, display: ' none' });
  formSubmitAnim.to(formSubmit, { duration: 0, display: 'flex' });
  formSubmitAnim.from(formSubmitChildren, {
    duration: 0.8,
    y: 16,
    opacity: 0,
    ease: 'power3,inOut',
  });
};
