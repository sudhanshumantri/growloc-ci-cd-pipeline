const plant = {
  headers: [
    {
      label: 'Batch No',
      key: 'batchName',
      redirection: true,
      redirectionKey: 'link'
    }, {
      label: 'Crop',
      key: 'crop',
      redirection: false
    }, {
      label: 'Variety',
      key: 'variety',
      redirection: false
    }, {
      label: 'Seeding Date',
      key: 'transplantingDate',
      redirection: false
    }, {
      label: 'Est Harvest Date',
      key: 'estDate',
      redirection: false
    },
    {
      label: 'No. of Plants',
      key: 'noOfPlants',
      redirection: false
    }
  ],
  rows:
    [{ "id": 1204, "seedingId": 316, "crop": "Pepper", "batchName": "WK39/01", "variety": "Common Black Pepper", "stage": "Harvest", "transplantingDate": "2022-09-21", "noOfPlants": 6000, "noOfSeeds": 2028, "estDate": "2022-09-23", "dueIn": -9 },
    { "id": 1194, "seedingId": 317, "crop": "Pepper", "batchName": "WK39/02", "variety": "Common Black Pepper", "stage": "Germination", "transplantingDate": "2022-09-30", "noOfPlants": 500, "noOfSeeds": 5000, "estDate": "2022-09-30", "dueIn": -2, },
    { "id": 1042, "seedingId": 279, "crop": "Cherry Tomatoes", "batchName": "WK34/01", "variety": "General Variety", "stage": "Harvest", "transplantingDate": "2022-08-15", "noOfPlants": 2000, "noOfSeeds": 6000, "estDate": "2022-10-14", "dueIn": 12 }]
}


export default plant;
