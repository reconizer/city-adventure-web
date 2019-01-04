import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_PENDING,
  ADVENTURES_REJECTED,
  ADVENTURES_CANCELLED,
  ADVENTURES_UNPUBLISHED
} from '@/config'

export default (adventureId) => new Promise((resolve) => {
  setTimeout(() => {
    let adventure = {};

    if(adventureId > 3) {
      adventure = {
        id: adventureId,
        name: localStorage.getItem(`${adventureId}-name`),
        creator_id: 2,
        cover_url: "http://placehold.it/320x180",
        status: ADVENTURES_PENDING,
        hidden: false,
        rating: 0,
        difficulty: 1,
        duration: {
          min: 60,
          max: 120
        },
        description: "",
        images: [
          {
            id: 1,
            url: "http://placehold.it/400x400",
            order: 0
          },
          {
            id: 2,
            url: "http://placehold.it/500x500",
            order: 1
          }
        ]
      }
    } else {
      adventure = {
        id: adventureId,
        name: "Sekrety Starówki",
        cover_url: "http://placehold.it/320x180",
        creator_id: 2,
        // Let adventure with id 1 be published and act accordingly
        status: adventureId == 1 ? ADVENTURES_PUBLISHED : ADVENTURES_PENDING,
        hidden: false,
        rating: 4.75,
        difficulty: 2,
        duration: {
          min: 60,
          max: 120
        },
        description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        images: [
          {
            id: 1,
            url: "http://placehold.it/400x400",
            order: 0
          },
          {
            id: 2,
            url: "http://placehold.it/500x500",
            order: 1
          },
          {
            id: 3,
            url: "http://placehold.it/300x600",
            order: 2
          },
          {
            id: 4,
            url: "http://placehold.it/600x500",
            order: 3
          }
        ]
      };
    }

    resolve({
      data: adventure
    });
  }, 500);
});
