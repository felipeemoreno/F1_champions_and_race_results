import axios from "axios";

axios.get('http://ergast.com/api/f1/2021/1/results.json')
  .then( response => {
    const { data } = response;
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
  