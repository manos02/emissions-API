import axios from 'axios';

class CountriesISOYYService {

  getCountriesY(year) {
    console.log(year);
    var yearString = year["year"];
    return axios.get(`http://localhost:51417/countries/year${yearString}`);
  }
}

export default new CountriesISOYYService;