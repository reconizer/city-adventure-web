export default (page, query, sort) => new Promise((resolve) => {
  setTimeout(() => {
    let per_page = 24;

    let adventures = {
      data: []
    };

    for(let i = 1; i <= per_page; i++) {
      let id = i + (page - 1) * per_page;
      let rating = Math.random() * 5;

      adventures.data.push({
        id: i,
        name: `Adventure #${i}`,
        cover_url: "http://placehold.it/400x400",
        published: Math.random() > 0.5 ? true : false,
        hidden: Math.random() > 0.7 ? true: false,
        rating: Math.round(rating * 100 + Number.EPSILON) / 100
      });
    }

    resolve(adventures);
  }, 500);
});
