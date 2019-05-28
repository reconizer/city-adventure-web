export default (params) => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      data: { id: +new Date() }
    });
  }, 500);
});
