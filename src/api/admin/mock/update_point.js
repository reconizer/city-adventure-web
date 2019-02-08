export default (adventureId, pointId, params) => new Promise((resolve) => {
  setTimeout(() => {
    let point = {
      data: {
        ...params
      }
    };

    resolve(point);
  }, 500);
});
