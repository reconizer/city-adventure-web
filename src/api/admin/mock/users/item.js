export default (id) => new Promise((resolve) => {
  setTimeout(() => {
    let user = {
      id: id,
      name: `User ${id + 1}`,
      email: `user${id + 1}@domain.com`,
      avatar_url: 'http://placehold.it/400x400'
    };

    resolve({
      data: user
    });
  }, 500);
});
