import axios from 'axios';

class CountriesISOService {

  getCountriesISO(iso) {
    var isoString = iso["iso"];
    return axios.get(`http://localhost:51417/countries/${isoString}`);
  }
}

export default new CountriesISOService;