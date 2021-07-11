const axios = require('axios');

// http://ergast.com/api/f1/{{year}}/{{round}}/results
axios.get('http://ergast.com/api/f1/2021/1/results.json')
  .then(function(response){
    var data = response.data;
    console.log(data);
  })
  .catch(function(err){
    console.error(err);
  });
