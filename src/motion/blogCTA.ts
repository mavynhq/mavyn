import { gsap } from 'gsap';

export const blogCTAMovement = (e: HTMLElement) => {
  const animateWrapper = e.children[0].children[1] as HTMLElement;
  const ctaTL = gsap.timeline({ yoyo: true, repeat: 4 });
  ctaTL.to(animateWrapper, { duration: 35, x: '-50%', ease: 'linear' });
};
