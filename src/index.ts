import { formNext } from 'src/anim/formNext';
import { imageSliderNext } from 'src/anim/imageSliderNext';
import { imageSliderPrev } from 'src/anim/imageSliderPrev';
import { servicesAnimIn } from 'src/anim/servicesAnimIn';
import { servicesAnimOut } from 'src/anim/servicesAnimOut';

import { convertJSON } from '$utils/convertJSON';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Home Form Slider
  const formSlide01 = $('#bookFormSlide01');
  const formSlide01Children = formSlide01.children('.slider-slide_item');
  const formSlide02 = $('#bookFormSlide02');
  const formSlide02Children = formSlide02.children('.slider-slide_item');
  const formSubmit = $('#formSubmitLoader');
  const formSubmitChildren = formSubmit.children();
  const formTimeline = formNext(
    formSlide01[0],
    formSlide01Children,
    formSlide02[0],
    formSlide02Children
  );

  document.querySelector('#bookFormNext')?.addEventListener('click', () => {
    formTimeline.play();
  });
  document.querySelector('#bookFormBack')?.addEventListener('click', () => {
    formTimeline.reverse();
  });

  // const bookingForm = document.querySelector('#wf-form-bookingForm');
  // bookingForm?.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   // const form = $(e.target);
  //   // console.log('e', form);
  // });

  $('#wf-form-bookingForm').each(function (i, el) {
    const form = $(el)[0];
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const formElement = $(target);
      const formData = convertJSON(formElement);
      console.log('form data', formData);
    });
    // form.submit(function (e) {
    //   e.preventDefault();
    //   form = $(e.target);
    //   const data = convertFormToJSON(form);
    //   let action = form.attr('action');
    //   console.log('action', action, 'data', data);
    // });
  });

  // Home Image Slider Animation
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
    // console.log(prevImage, currentImageCount);

    if (currentImageCount > 0 && currentImageCount <= imageAmount - 1) {
      currentImageCount -= 1;
      currentScrollPos = currentImageCount * imagesPercent;
      imageSliderPrev(prevImage, currentScrollPos, numbersWrap);
    }
  });

  // Home Services Accordian Animation
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
});
