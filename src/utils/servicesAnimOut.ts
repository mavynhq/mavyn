import { gsap } from 'gsap';

export const servicesAnimOut = (
  contentWrapper: HTMLElement,
  targetImage: HTMLElement,
  targetText: HTMLElement,
  targetIndicator: HTMLElement
) => {
  const servicesRevealOut = gsap.timeline();
  servicesRevealOut.to([targetImage, targetText], {
    duration: 0.6,
    opacity: '0',
    ease: 'power4.out',
  });
  servicesRevealOut.to([targetImage, targetText], {
    duration: 0,
    display: 'none',
  });
  servicesRevealOut.to(
    contentWrapper,
    {
      duration: 1,
      height: '0vh',
      ease: 'expo.inOut',
    },
    '-=0.4'
  );
  servicesRevealOut.to(
    targetIndicator,
    {
      duration: 0.6,
      rotation: 0,
      ease: 'expo.inOut',
    },
    '-=1'
  );
  return servicesRevealOut;
};
