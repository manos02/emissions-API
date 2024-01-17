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
  }

}

export default new ContinentsNameService;