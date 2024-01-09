import axios from 'axios';

class CountriesISOService {

  getCountriesISO(iso, filter) {
    var isoString = iso["iso"]; 
    const url = `http://localhost:51417/countries/${isoString}?${filter}`;
    console.log(url);
    return axios.get(url);
  }
}

export default new CountriesISOService;