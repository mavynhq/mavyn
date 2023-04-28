import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { imageSliderNext, imageSliderPrev } from '$motion/imageSliderMotion';
import { formNext, openDropdown, closeDropdown, formError } from '$motion/mainFormMotion';
import { navTransition } from '$motion/navTransition';
import { preloader } from '$motion/preloader';
import { servicesAnimIn, servicesAnimOut } from '$motion/servicesAccordianMotion';
import { expertJSON } from '$utils/generateExpertJSON';
import { convertFormData, postFormData, checkForm } from '$utils/mainFormUtils';
import { expertFormPost } from '$utils/postExpertForm';
import { querySelectorAlltoArray } from '$utils/querySelectorAlltoArray';

gsap.registerPlugin(ScrollTrigger);

export const homepage = () => {
  // ------------------
  // Page Globals
  // ------------------

  // Preloader
  //-----------
  const pl = preloader();
  pl.play();

  // set navbar animation
  // ---------------------
  const hasVideoBG = true;
  const navScrollSection = document.querySelector('.section_home-hero')?.className as string;
  setTimeout(() => {
    navTransition(navScrollSection, hasVideoBG);
  }, 1000);

  // ----------------
  // Main Form Slider
  // ----------------

  // Form dropdown functionality
  const expertTypes = querySelectorAlltoArray('.booking-form_item');
  const expertTypeInput = document.querySelector('#bFormExpertType') as HTMLInputElement;

  for (let i = 0; i < expertTypes.length; i++) {
    const temp = expertTypes[i] as HTMLElement;
    temp.addEventListener('click', (e) => {
      const closeDrop = closeDropdown();
      closeDrop.play();

      const target = e.target as HTMLElement;
      const selectionText = target.children[1].innerHTML;
      expertTypeInput.value = selectionText;
    });
  }

  document.querySelector('.slider_dropdown-wrap')?.addEventListener('click', (e) => {
    const openDrop = openDropdown();
    openDrop.play();
  });

  //Form progression animation
  const formNextAnimation = formNext();
  const formErrorAnimation = formError();

  document.querySelector('#bookFormNext')?.addEventListener('click', () => {
    const formValid = checkForm(0);
    formErrorAnimation.reverse();

    if (formValid) {
      formNextAnimation.play();
    } else {
      formErrorAnimation.play();
    }
  });

  document.querySelector('#bookFormBack')?.addEventListener('click', () => {
    formNextAnimation.reverse();
  });

  // document.querySelector()

  // Form ajax submission
  const bookingForm = document.querySelector('#wf-form-bookingForm');
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = convertFormData(form);

    const formValid = checkForm(1);
    if (formValid) {
      // console.log('POST DATA');
      postFormData(data, form);
    } else {
      formErrorAnimation.play();
    }
  });

  // Form reset
  document.querySelector('#resetMainForm')?.addEventListener('click', () => {
    document.location.reload();
  });

  // ---------------------------
  // Values image movement
  // ---------------------------
  const valuesImage = '.section_home-values';
  const valueImageContainer = document.querySelector('.home-values_image-wrap');

  setTimeout(() => {
    const valuesImageTL = gsap.timeline({
      scrollTrigger: {
        trigger: valuesImage,
        start: 'top center',
        end: 'bottom center',
        // markers: true,
        scrub: true,
      },
    });
    valuesImageTL.to(valueImageContainer, { width: '100%' });
  }, 1000);

  // ---------------------------
  // Home Image Slider Animation
  // ---------------------------
  const images = [...document.querySelectorAll('.home-slider_image')];
  images.reverse();
  const numbersWrap = document.getElementsByClassName('home-slider_number-wrapper');
  let currentImageCount = 0;
  let currentScrollPos = 0;
  const imageAmount = images.length;
  const imagesPercent = 1 / images.length;

  document.querySelector('#controlsNext')?.addEventListener('click', () => {
    const currentImage = images[currentImageCount];
    if (currentImageCount >= 0 && currentImageCount < imageAmount - 1) {
      currentImageCount += 1;
      currentScrollPos = currentImageCount * imagesPercent;
      imageSliderNext(currentImage, currentScrollPos, numbersWrap);
    }
  });
  document.querySelector('#controlsPrev')?.addEventListener('click', () => {
    const prevImage = images[currentImageCount - 1];
    if (currentImageCount > 0 && currentImageCount <= imageAmount - 1) {
      currentImageCount -= 1;
      currentScrollPos = currentImageCount * imagesPercent;
      imageSliderPrev(prevImage, currentScrollPos, numbersWrap);
    }
  });

  // ---------------------------------
  // Home Services Accordian Animation
  // ---------------------------------
  let toggled = false;
  $('.home-services_item-wrap').on('click', function () {
    const contentWrapper: HTMLElement = $(this).children('.home-services_item-content')[0];
    const targetText: HTMLElement = $(this)
      .children('.home-services_item-content')
      .children('.home-services_item-text')[0];
    const targetImage: HTMLElement = $(this)
      .children('.home-services_item-content')
      .children('.home-services_item-image-wrap')[0];
    const targetIndicator: HTMLElement = $(this)
      .children('.home-services_item-header')
      .children('.item-header_icon')[0];

    if (toggled === false) {
      toggled = true;
      servicesAnimIn(contentWrapper, targetImage, targetText, targetIndicator);
    } else {
      toggled = false;
      servicesAnimOut(contentWrapper, targetImage, targetText, targetIndicator);
    }
  });
  // ------------------
  // Experts apply form
  // ------------------
  const expertForm = document.querySelector('#wf-form-expertForm');
  expertForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);

    const expertFormJSON = expertJSON(formData, target);
    expertFormPost(expertFormJSON, target);
  });
};
