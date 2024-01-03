import axios from 'axios';

class CountriesISOYYService {

  getCountriesYY(year) {
    var yearString = year["year"];
    return axios.get(`http://localhost:51417/countries/year${yearString}`);
  }
}

export default new CountriesISOYYService;