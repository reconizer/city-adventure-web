import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED,
  ADVENTURES_REJECTED,
  ADVENTURES_CANCELLED,
  ADVENTURES_PENDING
} from '@/config'

export default (status, page, query, sort) => new Promise((resolve) => {
  setTimeout(() => {
    let per_page = 12;

    let total_pages = 0;

    switch(status) {
      default:
      case ADVENTURES_PUBLISHED:
        total_pages = 13;
        break;
      case ADVENTURES_IN_REVIEW:
        total_pages = 2;
        break;
      case ADVENTURES_UNPUBLISHED:
        total_pages = 6;
        break;
      case ADVENTURES_REJECTED:
        total_pages = 3;
        break;
      case ADVENTURES_CANCELLED:
        total_pages = 1;
        break;
      case ADVENTURES_PENDING:
        total_pages = 0;
        break;
    }

    let response = {
      data: {
        adventures: [],
        total_pages
      }
    };

    if(total_pages == 0) {
      resolve(response);
      return;
    }

    for(let i = 1; i <= per_page; i++) {
      let id = i + (page - 1) * per_page;
      let rating = 1 + Math.random() * 4;

      response.data.adventures.push({
        id: id,
        name: `Adventure #${id}`,
        cover_url: "http://placehold.it/400x400",
        status: status,
        shown: Math.random() > 0.7 ? false : true,
        rating: Math.round(rating * 100 + Number.EPSILON) / 100,
        published_at: +new Date()
      });
    }

    resolve(response);
  }, 500);
});
