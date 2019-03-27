export default (page, query) => new Promise((resolve) => {
  setTimeout(() => {
    let per_page = 20;
    let total_pages = 13;

    let response = {
      data: {
        users: [],
        total_pages
      }
    };

    for(let i =1; i <= per_page; i++) {
      let id = i + (page - 1) * per_page;

      response.data.users.push({
        id: id,
        name: `User ${id + 1}`,
        email: `user${id + 1}@domain.com`,
        avatar_url: 'http://placehold.it/400x400'
      });
    }

    resolve(response);
  }, 500);
});
