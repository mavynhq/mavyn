import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const navTransition = (scrollSection: string, hasVideoBG: boolean) => {
  // console.log(scrollSection);
  const navComponent = document.querySelector('.nav_component') as HTMLElement;
  const navBG = navComponent.children[0];
  const navContent = navComponent.children[2];
  const navImages = [...navContent.children[0].children].map((item) => {
    return item;
  });
  const navSpan = document.querySelector('.nav_span');

  const navVideoTL = gsap.timeline({});

  if (hasVideoBG === false) {
    navVideoTL.set(navImages[0], { opacity: 0 }).set(navImages[1], { opacity: 1 });

    const navScrollTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: '.' + scrollSection,
        start: '20% top',
        end: '20% top',
        toggleActions: 'play none none reverse',
        // markers: true,
      },
    });
    navScrollTrigger
      .to(navBG, { opacity: 1 })
      .to(navSpan, { duration: 0.6, backgroundColor: '#2b2b2b' }, '<');
  } else {
    navVideoTL.set(navImages[0], { opacity: 1 }).set(navImages[1], { opacity: 0 });

    const navScrollTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: '.' + scrollSection,
        start: '20% 10%',
        end: '20% 10%',
        toggleActions: 'play none none reverse',
        // scrub: true,
        // markers: true,
      },
    });
    navScrollTrigger
      .to(navBG, { duration: 0.8, opacity: 1 })
      .to(navImages[0], { duration: 0.6, y: '-100%', ease: 'expo.inOut' }, '<')
      .to(navImages[1], { duration: 0.6, opacity: 1 }, '<')
      .to(navSpan, { duration: 0.6, backgroundColor: '#2b2b2b' }, '<');
  }
};
