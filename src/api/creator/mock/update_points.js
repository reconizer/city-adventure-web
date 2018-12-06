export default (payload) => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ data: {} })
  }, 500);
});
