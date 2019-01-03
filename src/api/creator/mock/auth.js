export default (email, password) => new Promise((resolve) => {
  setTimeout(() => {
    let user = {
      data: {
        id: 2,
        email: email,
        name: "Creator Mock",
        token: "TEST_TOKEN"
      }
    };

    resolve(user);
  }, 500);
});
