export default (page) => new Promise((resolve) => {
  setTimeout(() => {
    let adventures = {
      data: [
        {
          id: 1,
          name: "Sekrety Starówki",
          cover_url: "http://placehold.it/320x180",
          status: "published",
          hidden: false,
          rating: 4.75
        },
        {
          id: 2,
          name: "Przygoda Dwa",
          cover_url: "http://placehold.it/400x400",
          status: "unpublished",
          hidden: false,
          rating: 0
        },
        {
          id: 3,
          name: "Inna przygoda",
          cover_url: "http://placehold.it/1000x600",
          status: "unpublished",
          hidden: true,
          rating: 0
        }
      ]
    };

    resolve(adventures);
  }, 500);
});
