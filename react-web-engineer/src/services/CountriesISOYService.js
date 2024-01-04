import axios from 'axios';

class CountriesISOYService {
  getCountriesISOYear(isoYear, filter) {
    var isoString = isoYear["iso"];
    var yearString = isoYear["year"];
    const queryParams = new URLSearchParams(filter).toString();
    const url = (`http://localhost:51417/countries/${isoString}/${yearString}?${queryParams}`);
    return axios.get(url);
  }
}

export default new CountriesISOYService();
