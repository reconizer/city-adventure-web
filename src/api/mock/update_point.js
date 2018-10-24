export default (adventureId, pointId, params) => new Promise((resolve) => {
  setTimeout(() => {
    let point = {
      data: {
        id: pointId,
        ...params
      }
    };

    resolve(point);
  }, 500);
});
