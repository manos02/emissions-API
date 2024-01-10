import axios from 'axios';

class CountriesISOYYService {

  getCountriesYY(year, filter) {
    var yearString = year["year"];
    const url = `http://localhost:51417/countries/year${yearString}?${filter}`
    console.log(url);
    return axios.get(url);
  }
}

export default new CountriesISOYYService;