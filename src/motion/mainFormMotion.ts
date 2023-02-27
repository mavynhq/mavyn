import { gsap } from 'gsap';

export const formError = () => {
  const formError = document.querySelector('#bookingFormError');
  console.log(formError);
  const animation = gsap.timeline({ paused: true });
  animation.to(formError, { display: 'block' });

  return animation;
};

export const formNext = () => {
  const formSlide01 = $('#bookFormSlide01');
  const formSlide01Children = formSlide01.children('.slider_item');
  const formSlide02 = $('#bookFormSlide02');
  const formSlide02Children = formSlide02.children('.slider_item');

  const formNext = gsap.timeline({ paused: true });
  formNext.to(formSlide01Children, {
    duration: 0.8,
    y: 16,
    opacity: 0,
    ease: 'power3,inOut',
    stagger: 0.2,
  });
  formNext.to(formSlide01, { duration: 0.6, opacity: 0, ease: 'power3.inOut' });
  formNext.to(formSlide01, { duration: 0, display: ' none' });
  formNext.to(formSlide02, { duration: 0, display: 'grid' });
  formNext.from(formSlide02Children, {
    duration: 0.8,
    y: 16,
    opacity: 0,
    ease: 'power3,inOut',
    stagger: 0.2,
  });
  formNext.to(formSlide02, { duration: 0.8, opacity: 1, ease: 'power3.inOut' });

  return formNext;
};

export const formWait = () => {
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

export const openDropdown = () => {
  const motion = gsap.timeline({ paused: true });
  motion.set('.booking-form_wrapper', { display: 'block', y: '0.5rem' });
  motion.to('.booking-form_wrapper', {
    opacity: 100,
    y: '0rem',
    // duration: 0.6,
    ease: 'power3.out',
  });
  return motion;
};

export const closeDropdown = () => {
  const motion = gsap.timeline({ paused: true });
  motion.to('.booking-form_wrapper', {
    opacity: 0,
    y: '0.5rem',
    // duration: 0.6,
    ease: 'power2.out',
  });
  motion.set('.booking-form_wrapper', { display: 'none' });
  return motion;
};
