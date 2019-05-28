export default () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      data: {
        email: "test@domain.com"
      }
    });
  }, 500);
});
