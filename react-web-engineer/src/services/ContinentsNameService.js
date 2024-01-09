import axios from 'axios';

class ContinentsNameService {

  getContinentsName(name, filter) {
    var nameString = name["name"];
    const queryParams = new URLSearchParams(filter).toString();
    const url = `http://localhost:51417/continents/${nameString}?${queryParams}`;
    return axios.get(url);
  }
}

export default new ContinentsNameService;