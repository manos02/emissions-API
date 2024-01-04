import axios from 'axios';

class CountriesService {

  getCountries(filter) {
  const queryParams = new URLSearchParams(filter).toString();
  const url = `http://localhost:51417/countries?${queryParams}`;
  return (axios.get(url));
  }
}

export default new CountriesService;