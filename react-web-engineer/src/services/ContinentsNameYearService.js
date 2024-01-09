import axios from 'axios';

class ContinentsNameYear {
  getContinentsNameYear(nameYear, filter) {
    var nameString = nameYear["name"];
    var yearString = nameYear["year"];
    const url = (`http://localhost:51417/continents/${nameString}/${yearString}?${filter}`);
    return axios.get(url);
  }
}

export default new ContinentsNameYear();