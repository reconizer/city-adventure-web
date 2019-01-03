export default (email, password) => new Promise((resolve) => {
  setTimeout(() => {
    let user = {
      data: {
        id: 1,
        email: email,
        name: "Admin Mock",
        token: "TEST_TOKEN"
      }
    };

    resolve(user);
  }, 500);
});
