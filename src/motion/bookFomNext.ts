import { gsap } from 'gsap';

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
