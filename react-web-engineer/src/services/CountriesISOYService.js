import axios from 'axios';

class CountriesISOYService {
  getCountriesISOYear(isoYear, filter) {
    var isoString = isoYear["iso"];
    var yearString = isoYear["year"];
    const url = (`http://localhost:51417/countries/${isoString}/${yearString}?${filter}`);
    return axios.get(url);
  }

  deleteCountriesISOYear(isoYear){
    var isoString = isoYear["iso"];
    var yearString = isoYear["year"];
    const url = (`http://localhost:51417/countries/${isoString}/${yearString}`);
    return axios.delete(url);
  }

  putCountriesISOYear(isoYear, data){
    var isoString = isoYear["iso"];
    var yearString = isoYear["year"];
    const url = (`http://localhost:51417/countries/${isoString}/${yearString}`);
    return axios.put(url, data).then((response) => {
      console.log(response);
      return response;
      })
      .catch((error) => {
          console.log(error);
      });
  }

}

export default new CountriesISOYService();
