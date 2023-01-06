import { querySelectorAlltoArray } from '$utils/querySelectorAlltoArray';

export const filterBlogList = (blogs: Element[], filters: Array<string>) => {
  const filteredBlog = blogs.filter((item) => {
    const blogTemp = item as HTMLElement;
    const blogType = blogTemp.children[0].children[1].children[0].innerHTML as string;
    if (filters.includes(blogType)) {
      return blogTemp;
    }
  });
  return filteredBlog;
};

// export const searchBlogList = (blogs: Element[], query: string) => {};

export const hideAll = () => {
  // console.log('hide all');
  const blogsMaster = querySelectorAlltoArray('.blogs_item');
  for (const item of blogsMaster) {
    item.classList.add('hide');
    // console.log(item);
  }
};

export const renderBlogUpdate = (blogs: Element[], limit: number) => {
  // console.log('limit', limit);
  const loadButton = document.querySelector('#blogLoadButton') as HTMLElement;
  const nextpageButton = document.querySelector('.blog-search_pagation') as HTMLElement;
  hideAll();

  // show full set
  if (limit < blogs.length) {
    loadButton.style.display = 'flex';
    // nextpageButton.style.display = 'none';
    for (let i = 0; i <= limit - 1; i++) {
      blogs[i].classList.remove('hide');
    }
  }
  // show partial set
  if (limit > blogs.length) {
    // console.log('displaying partial set of items');
    loadButton.style.display = 'none';
    // nextpageButton.style.display = 'none';
    for (let i = 0; i <= blogs.length - 1; i++) {
      blogs[i].classList.remove('hide');
    }
  }
  // at limit
  if (limit === 100) {
    loadButton.style.display = 'none';
    for (let i = 0; i <= blogs.length - 1; i++) {
      blogs[i].classList.remove('hide');
    }
  }
};
