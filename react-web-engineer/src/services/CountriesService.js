import axios from "axios";

class CountriesService {
  getCountries(filter) {
    const url = `http://localhost:51417/countries?${filter}`;
    console.log(url);
    return axios.get(url);
  }
}

export default new CountriesService();
