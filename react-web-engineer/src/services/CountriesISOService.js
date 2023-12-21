import axios from 'axios';

class CountriesISOService {

  getCountriesISO(iso){
    return (axios.get('http://localhost:51417/countries/AFG'));
  }

}

export default new CountriesISOService;