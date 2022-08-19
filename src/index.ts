import { servicesAnimIn } from '$utils/servicesAnimIn';
import { servicesAnimOut } from '$utils/servicesAnimOut';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Services Accordian Animation
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
