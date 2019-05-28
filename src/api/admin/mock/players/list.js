export default (page, query) => new Promise((resolve) => {
  setTimeout(() => {
    let per_page = 20;
    let total_pages = 13;

    let response = {
      data: {
        players: [],
        total_pages
      }
    };

    for(let i = 1; i <= per_page; i++) {
      let id = i + (page - 1) * per_page;

      response.data.players.push({
        id: id,
        name: `User ${id}`,
        email: `user${id}@domain.com`,
        avatar_url: 'http://placehold.it/400x400'
      });
    }

    resolve(response);
  }, 500);
});
