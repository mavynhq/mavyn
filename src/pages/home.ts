import { formNext } from 'src/motion/bookFomNext';
import { imageSliderNext } from 'src/motion/imageSliderNext';
import { imageSliderPrev } from 'src/motion/imageSliderPrev';
import { preloader } from 'src/motion/preloader';
import { servicesAnimIn } from 'src/motion/servicesAnimIn';
import { servicesAnimOut } from 'src/motion/servicesAnimOut';

import { navTransition } from '$anim/navTransition';
import { bookingJSON } from '$utils/generateBookingJSON';
import { expertJSON } from '$utils/generateExpertJSON';
import { expertFormPost } from '$utils/postExpertForm';
import { mainFormPost } from '$utils/postMainForm';

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
  const navScrollSection = document.querySelector('.section_home-values')?.className as string;
  setTimeout(() => {
    navTransition(navScrollSection, hasVideoBG);
  }, 1000);

  // ----------------
  // Main Form Slider
  // ----------------
  //Form progression animation
  const formTimeline = formNext();
  document.querySelector('#bookFormNext')?.addEventListener('click', () => {
    formTimeline.play();
  });
  document.querySelector('#bookFormBack')?.addEventListener('click', () => {
    formTimeline.reverse();
  });

  // Form ajax submission
  const bookingForm = document.querySelector('#wf-form-bookingForm');
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const formElement = $(target);
    const formData = bookingJSON(formElement);
    const apiEndpoint = bookingForm.getAttribute('action') as string;

    mainFormPost(formElement, apiEndpoint, formData);
  });

  // Form reset
  document.querySelector('#resetMainForm')?.addEventListener('click', () => {
    document.location.reload();
  });

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
