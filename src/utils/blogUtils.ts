import { querySelectorAlltoArray } from '$utils/querySelectorAlltoArray';

export const filterBlogList = (blogs: Array<Element>, filters: Array<string>) => {
  const filteredBlog = blogs.filter((e, i) => {
    const blogTemp = blogs[i] as HTMLElement;
    const blogType = blogTemp.children[0].children[1].children[0].innerHTML as string;
    if (filters.includes(blogType)) {
      return blogTemp;
    }
  });
  return filteredBlog;
};

export const hideAll = () => {
  const blogsMaster = querySelectorAlltoArray('.blogs_item');
  for (const i in blogsMaster) {
    const temp = blogsMaster[i] as HTMLElement;
    temp.style.display = 'none';
  }
};

export const renderBlogUpdate = (renderList: Element[], renderLimit: number) => {
  const loadButton = document.querySelector('#blogLoadButton') as HTMLElement;
  const nextpageButton = document.querySelector('.blog-search_pagation') as HTMLElement;
  hideAll();

  if (renderLimit === 100) {
    console.log('at limit');
    // nextpageButton.style.display = 'flex';
    loadButton.style.display = 'none';
    for (let i = 0; i <= renderList.length - 1; i++) {
      const temp = renderList[i] as HTMLElement;
      temp.style.display = 'block';
    }
  }
  if (renderLimit > renderList.length) {
    // console.log('displaying partial set of items');
    loadButton.style.display = 'none';
    nextpageButton.style.display = 'none';
    for (let i = 0; i <= renderList.length - 1; i++) {
      const temp = renderList[i] as HTMLElement;
      temp.style.display = 'block';
    }
  }
  if (renderLimit < renderList.length) {
    // console.log('displaying full set of items');
    loadButton.style.display = 'flex';
    nextpageButton.style.display = 'none';
    for (let i = 0; i <= renderLimit - 1; i++) {
      const temp = renderList[i] as HTMLElement;
      temp.style.display = 'block';
    }
  }
};
