import axios from 'axios';

class ContinentsNameService {

  getContinentsName(name, filter) {
    var nameString = name["name"];
    const url = `http://localhost:51417/continents/${nameString}?${filter}`;
    return axios.get(url);
  }

  postContinentsName(name, data){
    var nameString = name["name"]; 
    const url = `http://localhost:51417/continents/${nameString}`;
    return axios.post(url, 
      data)
    .then((response) => {
    console.log(response);
    return response;
    })
    .catch((error) => {
        console.log(error.response.data);
    });
  }

}

export default new ContinentsNameService;