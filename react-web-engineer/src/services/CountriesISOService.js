import axios from "axios";

class CountriesISOService {
  getCountriesISO(iso, filter) {
    var isoString = iso["iso"];
    const url = `http://localhost:51417/countries/${isoString}?${filter}`;
    console.log(url);
    return axios.get(url);
  }

  postCountriesISO(iso, data) {
    var isoString = iso["iso"];
    const url = `http://localhost:51417/countries/${isoString}`;
    return axios.post(url, data);
  }
}

export default new CountriesISOService();
