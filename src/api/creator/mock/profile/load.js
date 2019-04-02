export default () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      data: {
        name: "Test Account Name",
        description: "Test",
        avatar_url: "http://placehold.it/250x250"
      }
    });
  }, 500);
});
