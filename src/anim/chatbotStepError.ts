import { gsap } from 'gsap';

export const stepError = (formElement: HTMLInputElement) => {
  const stepErrorTimeline = gsap.timeline();
  stepErrorTimeline.to(formElement, {
    backgroundColor: 'rgba(24, 161, 255, 0.1)',
    borderColor: 'rgba(24, 161, 255, 0.6)',
  });
};
