export default new Promise((resolve) => {
  setTimeout(() => {
    let points = {
      data: [
        //Start
        {
          id: 1,
          parent_id: null,
          position: {
            lat: 53.0098,
            lng: 18.60216,
            test: "asd"
          },
          clues: [
            {
              id: 1,
              type: "sound",
              details: {
                url: "http://test.com"
              }
            }
          ]
        },
        //Fontanna
        {
          id: 2,
          parent_id: 1,
          position: {
            lat: 53.01057,
            lng: 18.59991
          },
          clues: [
            {
              id: 2,
              type: "text",
              details: {
                text: "Odpowiedzi szukaj u Psa, Smoka i Kury bez Głowy"
              }
            }
          ]
        },
        //Filutek
        {
          id: 3,
          parent_id: 2,
          position: {
            lat: 53.01105,
            lng: 18.6045
          },
          clues: [
            {
              id: 3,
              type: "image",
              details: {
                url: "http://placehold.it/500x500"
              }
            }
          ]
        },
        //Smok
        {
          id: 4,
          parent_id: 3,
          position: {
            lat: 53.0107,
            lng: 18.60881
          },
          clues: [
            {
              id: 4,
              type: "image",
              details: {
                url: "http://placehold.it/600x600"
              }
            }
          ]
        },
        //Kura
        {
          id: 5,
          parent_id: 4,
          position: {
            lat: 53.01218,
            lng: 18.60433
          },
          clues: [
            {
              id: 5,
              type: "image",
              details: {
                url: "http://placehold.it/400x500"
              }
            }
          ]
        },
        //Kopernik
        {
          id: 6,
          parent_id: 5,
          position: {
            lat: 53.0103,
            lng: 18.60496
          },
          clues: [
            {
              id: 7,
              type: "image",
              details: {
                url: "http://placehold.it/400x200"
              }
            },
            {
              id: 8,
              type: "image",
              details: {
                url: "http://placehold.it/500x200"
              }
            }
          ]
        },
        // Brama Mostowa
        {
          id: 7,
          parent_id: 6,
          position: {
            lat: 53.00855,
            lng: 18.60891
          }
        }
      ]
    };

    resolve(points);
  }, 500);
});

