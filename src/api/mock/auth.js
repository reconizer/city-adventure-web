export default (email, password) => new Promise((resolve) => {
  setTimeout(() => {
    let user = {
      email: email,
      data: {
        token: "TEST_TOKEN"
      }
    };

    resolve(user);
  }, 500);
});
