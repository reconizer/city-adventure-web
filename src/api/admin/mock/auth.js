export default (email, password) => new Promise((resolve) => {
  setTimeout(() => {
    let user = {
      data: {
        id: +new Date(),
        email: email,
        name: "Creator Mock",
        token: "TEST_TOKEN"
      }
    };

    resolve(user);
  }, 500);
});
