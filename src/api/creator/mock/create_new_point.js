export default (adventureId, parentId, lat, lng) => new Promise((resolve) => {
  setTimeout(() => {
    let point = {
      data: {
        id: +new Date(),
        parent_id: parentId,
        position: {
          lat: lat,
          lng: lng
        },
        radius: 20,
        hidden: false,
        clues: [],
        answers: []
      }
    };

    resolve(point);
  }, 1000);
});
