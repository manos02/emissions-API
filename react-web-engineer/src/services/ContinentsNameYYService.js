import axios from "axios";

class ContinentNameYYService {
  getContinentNameYY(year, filter) {
    var yearString = year["year"];
    const url = `http://localhost:51417/continents/year${yearString}?${filter}`;
    console.log(url);
    return axios.get(url);
  }
}

export default new ContinentNameYYService();
