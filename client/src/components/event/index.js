/*
* EVENT
* log a new client event in the database
*/

const Axios = require('axios');

export function Event(name, metadata){

  Axios.post('/api/event', {

    name: name,
    metadata: metadata

  });
}