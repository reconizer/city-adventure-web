export default (id) => new Promise((resolve) => {
  setTimeout(() => {
    let user = {
      id: id,
      name: `User ${id}`,
      email: `user${id}@domain.com`,
      avatar_url: 'http://placehold.it/400x400'
    };

    resolve({
      data: user
    });
  }, 500);
});
