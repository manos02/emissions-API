import axios from 'axios';

class ContinentsNameYear {
  getContinentsNameYear(nameYear, filter) {
    var nameString = nameYear["name"];
    var yearString = nameYear["year"];
    const url = (`http://localhost:51417/continents/${nameString}/${yearString}?${filter}`);
    return axios.get(url);
  }

  deleteContinentsNameYear(nameYear){
    var nameString = nameYear["name"];
    var yearString = nameYear["year"];
    const url = (`http://localhost:51417/continents/${nameString}/${yearString}`);
    return axios.delete(url);
  }

  putContinentsNameYear(nameYear, data){
    var nameString = nameYear["name"];
    var yearString = nameYear["year"];
    const url = (`http://localhost:51417/continents/${nameString}/${yearString}`);
    return axios.put(url, data).then((response) => {
      console.log(response);
      return response;
      })
      .catch((error) => {
          console.log(error);
      });
  }

}

export default new ContinentsNameYear();