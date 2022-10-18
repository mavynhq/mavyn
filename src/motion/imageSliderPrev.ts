import { gsap } from 'gsap';

export const imageSliderPrev = (image: Element, scrollPos: number, numbersWrap: HTMLCollection) => {
  const moveImagePrev = gsap.timeline();
  moveImagePrev.to(image, { x: '0%', duration: 1, ease: 'expo.inOut' });
  moveImagePrev.to(numbersWrap, { y: -scrollPos * 100 + '%', duration: 1, ease: 'expo.inOut' }, 0);
};
