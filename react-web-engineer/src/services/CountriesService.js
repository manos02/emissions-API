import axios from 'axios';

class CountriesService {

  getCountries(){
    return (axios.get('http://localhost:51417/countries'));
  }

}

export default new CountriesService;