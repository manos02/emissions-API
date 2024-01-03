import axios from 'axios';

class CountriesISOYService {
  getCountriesISOYear(isoYear) {

    var isoString = isoYear["iso"];
    var yearString = isoYear["year"];

    return axios.get(`http://localhost:51417/countries/${isoString}/${yearString}`);
  }
}

export default new CountriesISOYService();
