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
