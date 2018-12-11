import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED
} from '@/config'

export default (status, page, query, sort) => new Promise((resolve) => {
  setTimeout(() => {
    let per_page = 12;

    let total_pages = 0;

    if(status == ADVENTURES_PUBLISHED) {
      total_pages = 13;
    } else if(status == ADVENTURES_IN_REVIEW) {
      total_pages = 2
    } else {
      total_pages = 6;
    }

    let response = {
      data: {
        adventures: [],
        total_pages
      }
    };

    for(let i = 1; i <= per_page; i++) {
      let id = i + (page - 1) * per_page;
      let rating = 1 + Math.random() * 4;

      response.data.adventures.push({
        id: i,
        name: `Adventure #${i}`,
        cover_url: "http://placehold.it/400x400",
        status: status,
        hidden: Math.random() > 0.7 ? true : false,
        rating: Math.round(rating * 100 + Number.EPSILON) / 100
      });
    }

    resolve(response);
  }, 500);
});
