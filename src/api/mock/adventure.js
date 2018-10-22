export default new Promise((resolve) => {
  setTimeout(() => {
    let adventure = {
      id: 1,
      name: "Sekrety Starówki",
      cover_url: "http://placehold.it/320x180",
      status: "published",
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

    resolve({
      data: adventure
    });
  }, 500);
});
