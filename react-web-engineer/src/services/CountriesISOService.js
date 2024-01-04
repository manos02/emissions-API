import axios from 'axios';

class CountriesISOService {

  getCountriesISO(iso, filter) {
    var isoString = iso["iso"];
    const queryParams = new URLSearchParams(filter).toString();
    const url = `http://localhost:51417/countries/${isoString}?${queryParams}`;
    return axios.get(url);
  }
}

export default new CountriesISOService;