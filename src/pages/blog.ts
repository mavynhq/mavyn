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
  let blogsRenderList: Element[] = [];

  //set blog limit
  const pageStepSize = 18;
  let pageLimit = 18;
  const totoalItemLimit = 100;

  blogsRenderList = blogsMaster;
  renderBlogUpdate(blogsRenderList, pageLimit);

  // Set Blog Filters
  // ------------------
  // get blog filter buttons and all serivces based on blogs posts
  const blogFilters = querySelectorAlltoArray('.blog-filters_item');
  const allBlogServices = [...blogsMaster].map((obj) => {
    const service = obj.children[0].children[1].children[0].innerHTML;
    return service;
  });
  const activeServices = [...new Set(allBlogServices)];

  //set active blog filters based on active services
  for (let i = 0; i < blogFilters.length; i++) {
    const serviceObj = blogFilters[i];
    const serviceType = serviceObj.children[0].children[3].innerHTML;

    const isVisible = activeServices.includes(serviceType);
    serviceObj.classList.toggle('hide', !isVisible);
  }

  // Filter blog items
  // ------------------
  let activeFilters: string[] = [];
  const filterCheckboxes = querySelectorAlltoArray('#blogCheckbox');

  for (let i = 0; i < filterCheckboxes.length; i++) {
    let checked = false;
    filterCheckboxes[i].addEventListener('change', (e) => {
      checked = !checked;
      const eventTarget = e.target as HTMLElement;
      const filterLabel = eventTarget.parentElement?.children[3].innerHTML as string;

      blogsRenderList = blogsMaster;

      if (checked === true) {
        activeFilters.push(filterLabel);

        const tempList = filterBlogList(blogsRenderList, activeFilters);
        blogsRenderList = tempList;
        renderBlogUpdate(blogsRenderList, pageLimit);
      } else {
        const updatedFilters = activeFilters.filter((item) => item !== filterLabel);
        activeFilters = updatedFilters;

        if (activeFilters.length < 1) {
          renderBlogUpdate(blogsRenderList, pageLimit);
        } else {
          const tempList = filterBlogList(blogsRenderList, activeFilters);
          blogsRenderList = tempList;
          renderBlogUpdate(blogsRenderList, pageLimit);
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
  let searchQuery: string;

  searchInputElement.addEventListener('input', (e) => {
    // console.log('search render list');
    const event = e.target as HTMLInputElement;
    searchQuery = event.value.toLowerCase();
    const searchList: Element[] = [];

    blogsRenderList.forEach((blog) => {
      const blogDescription =
        blog.children[0].children[1].children[1].children[2].innerHTML.toLowerCase();
      // console.log(blogDescription);

      if (blogDescription.includes(searchQuery)) {
        searchList.push(blog);
        renderBlogUpdate(searchList, pageLimit);
      }
    });
  });

  searchInputElement.addEventListener('keypress', (k) => {
    const keyEvent = k as KeyboardEvent;
    const keyPressed = keyEvent.key;

    if (keyPressed === 'Enter') {
      k.preventDefault();
      searchInputButton.click();
    }
  });

  // Clear search query
  const clearButton = document.querySelector('#searchClear') as HTMLElement;
  clearButton?.addEventListener('click', (e) => {
    searchQuery = '';
    searchInputElement.value = '';
    renderBlogUpdate(blogsRenderList, pageLimit);
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
      renderBlogUpdate(blogsRenderList, pageLimit);
    } else {
      blogsRenderList = blogsMaster;
      renderBlogUpdate(blogsMaster, pageLimit);
    }
  });
};
