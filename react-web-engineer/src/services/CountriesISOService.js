import axios from 'axios';

class CountriesISOService {

  getCountriesISO(iso, filter) {
    var isoString = iso["iso"]; 
    const url = `http://localhost:51417/countries/${isoString}?${filter}`;
    console.log(url);
    return axios.get(url);
  }

  postCountriesISO(iso, year, filter){
    var isoString = iso["iso"]; 
    const url = `http://localhost:51417/countries/${isoString}?${filter}`;
    return axios.post(url, year)
    .then((response) => {
    //console.log(response.data.token);
    return response.data.token;
    })
    .catch((error) => {
        console.log(error);
    });;
  }

}

export default new CountriesISOService;