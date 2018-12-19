import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED,
  ADVENTURES_PENDING,
  ADVENTURES_CANCELLED,
  ADVENTURES_REJECTED
} from '@/config'

export default (page) => new Promise((resolve) => {
  setTimeout(() => {
    let adventures = {
      data: [
        {
          id: 1,
          name: "Sekrety Starówki",
          cover_url: "http://placehold.it/320x180",
          status: ADVENTURES_PUBLISHED,
          hidden: false,
          rating: 4.75
        },
        {
          id: 2,
          name: "Przygoda Dwa",
          cover_url: "http://placehold.it/400x400",
          status: ADVENTURES_PENDING,
          hidden: false,
          rating: null
        },
        {
          id: 3,
          name: "Inna przygoda",
          cover_url: "http://placehold.it/1000x600",
          status: ADVENTURES_IN_REVIEW,
          hidden: true,
          rating: null
        }
      ]
    };

    resolve(adventures);
  }, 500);
});
