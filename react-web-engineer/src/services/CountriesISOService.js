import axios from 'axios';

class CountriesISOService {

  getCountriesISO(iso, filter) {
    var isoString = iso["iso"];
    const queryParams = new URLSearchParams(filter).toString();
    var params = queryParams["dataType"]
    const url = `http://localhost:51417/countries/${isoString}?$dataType=dataType${params}`;
    return axios.get(url);
  }
}

export default new CountriesISOService;