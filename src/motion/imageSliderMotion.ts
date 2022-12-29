import { gsap } from 'gsap';

export const imageSliderNext = (image: Element, scrollPos: number, numbersWrap: HTMLCollection) => {
  const moveImageNext = gsap.timeline();
  moveImageNext.to(image, { x: '-100%', duration: 1, ease: 'expo.inOut' });
  moveImageNext.to(numbersWrap, { y: -scrollPos * 100 + '%', duration: 1, ease: 'expo.inOut' }, 0);
};

export const imageSliderPrev = (image: Element, scrollPos: number, numbersWrap: HTMLCollection) => {
  const moveImagePrev = gsap.timeline();
  moveImagePrev.to(image, { x: '0%', duration: 1, ease: 'expo.inOut' });
  moveImagePrev.to(numbersWrap, { y: -scrollPos * 100 + '%', duration: 1, ease: 'expo.inOut' }, 0);
};
