import { gsap } from 'gsap';

export const servicesAnimIn = (
  contentWrapper: HTMLElement,
  targetImage: HTMLElement,
  targetText: HTMLElement,
  targetIndicator: HTMLElement
) => {
  const servicesRevealIn = gsap.timeline();
  servicesRevealIn.to([targetImage, targetText], {
    duration: 0,
    display: 'block',
  });
  servicesRevealIn.to(contentWrapper, {
    duration: 1,
    height: 'auto',
    delay: 0,
    ease: 'expo.inOut',
  });
  servicesRevealIn.to(
    targetIndicator,
    {
      duration: 0.8,
      rotation: 180,
      ease: 'expo.inOut',
    },
    '-=1.1'
  );
  servicesRevealIn.to(
    [targetImage, targetText],
    {
      duration: 2,
      opacity: '1',
      ease: 'power4.out',
      stagger: -0.2,
    },
    '-=0.2'
  );

  return servicesRevealIn;
};

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
