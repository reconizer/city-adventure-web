export default new Promise((resolve) => {
  setTimeout(() => {
    let user = {
      data: {
        token: "TEST_TOKEN"
      }
    };

    resolve(user);
  }, 500);
});
