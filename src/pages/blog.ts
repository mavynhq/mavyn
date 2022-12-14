import { navTransition } from '$motion/navTransition';
import { filterBlogList, renderBlogUpdate } from '$utils/blogUtils';
import { querySelectorAlltoArray } from '$utils/querySelectorAlltoArray';

export const blog = () => {
  // ------------------
  // Page Globals
  // ------------------

  // set navbar animation
  // ---------------------
  const hasVideoBG = false;
  const navScrollSection = document.querySelector('.section_blog-hero')?.className as string;
  setTimeout(() => {
    navTransition(navScrollSection, hasVideoBG);
  }, 100);

  // ------------------
  // Blog Filtering
  // ------------------

  // get master blog list
  const blogsMaster = querySelectorAlltoArray('.blogs_item');
  let blogsFiltered: Element[] = [];

  //set blog limit
  const pageStepSize = 18;
  let pageLimit = 18;
  const totoalItemLimit = 100;

  renderBlogUpdate(blogsMaster, pageLimit);

  // Set Blog Filters
  // ------------------
  // get blog filter buttons and all serivces based on blogs posts
  const blogFilters = document.querySelectorAll('.blog-search_item');
  const services = [...blogsMaster].map((obj, i) => {
    const service = obj.children[0].children[1].children[0].innerHTML;
    return service;
  });
  const activeServices = [...new Set(services)];
  console.log(activeServices);

  //set active blog filters based on active services
  for (let i = 0; i < blogFilters.length; i++) {
    const serviceType = blogFilters[i].children[0].children[3].innerHTML;
    if (activeServices.includes(serviceType)) {
    } else {
      const serviceTemp = blogFilters[i] as HTMLElement;
      console.log('temp', serviceTemp);
      serviceTemp.style.display = 'none';
    }
  }

  // Filter blog items
  // ------------------
  let activeFilters: string[] = [];
  const filterCheckboxes = querySelectorAlltoArray('#blogCheckbox');

  for (let i = 0; i < filterCheckboxes.length; i++) {
    let checked = false;
    // add click event to all filter buttons
    filterCheckboxes[i].addEventListener('change', (e) => {
      checked = !checked;
      //get label to changed filter button
      const eventTarget = e.target as HTMLElement;
      const filterLabel = eventTarget.parentElement?.children[3].innerHTML as string;
      //check filter state
      if (checked === true) {
        //checked, add filter label to active list
        activeFilters.push(filterLabel);
        blogsFiltered = filterBlogList(blogsMaster, activeFilters);
        renderBlogUpdate(blogsFiltered, pageLimit);
      } else {
        //unchecked, remove from active list
        const updatedFilters = activeFilters.filter((item) => item !== filterLabel);
        activeFilters = updatedFilters;
        //check if active filter is now empty
        if (activeFilters.length < 1) {
          renderBlogUpdate(blogsMaster, pageLimit);
        } else {
          blogsFiltered = filterBlogList(blogsMaster, activeFilters);
          renderBlogUpdate(blogsFiltered, pageLimit);
        }
      }
    });
  }

  // ------------------
  // Blog Search
  // ------------------
  // console.log(filterBlogList);
  const searchInputElement = document.querySelector('#blogSearchInput') as HTMLInputElement;
  const searchInputButton = document.querySelector('#blogSearchButton') as HTMLElement;

  // searchInputButton.addEventListener('click', (e) => {
  //   const searchQuery = searchInputElement.value;
  //   console.log('Search:', searchQuery);
  // });

  searchInputElement.addEventListener('input', (e) => {
    const event = e.target as HTMLInputElement;
    const searchQuery = event.value.toLowerCase();
    blogsMaster.forEach((blog) => {
      const blogDescription =
        blog.children[0].children[1].children[1].children[2].innerHTML.toLowerCase();
      console.log(blogDescription);

      const isVisible = blogDescription.includes(searchQuery);
      blog.classList.toggle('hide', !isVisible);
    });

    // console.log(blogsMaster);
  });

  searchInputElement.addEventListener('keypress', (k) => {
    const keyEvent = k as KeyboardEvent;
    const keyPressed = keyEvent.key;

    if (keyPressed === 'Enter') {
      k.preventDefault();

      searchInputButton.click();
    }
  });

  // ------------------
  // Blog limiting
  // ------------------
  const loadButton = document.querySelector('#blogLoadButton') as HTMLElement;

  loadButton?.addEventListener('click', (e) => {
    if (pageLimit < totoalItemLimit) {
      pageLimit += pageStepSize;

      if (pageLimit > totoalItemLimit) {
        pageLimit = 100;
      }
    }
    if (activeFilters.length > 0) {
      renderBlogUpdate(blogsFiltered, pageLimit);
    } else {
      renderBlogUpdate(blogsMaster, pageLimit);
    }
  });
};
