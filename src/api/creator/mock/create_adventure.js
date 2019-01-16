export default (params) => new Promise((resolve) => {
  setTimeout(() => {
    let adventure = {
      data: {
        id: +new Date(),
        ...params
      }
    };

    resolve(adventure);
  }, 600);
});
