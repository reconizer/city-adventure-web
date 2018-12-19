export default () => new Promise((resolve) => {
  setTimeout(() => {
    let response = {
      data: {
        history: [
          {
            
          }
        ]
      }
    };

    resolve(response);
  }, 500);
});
