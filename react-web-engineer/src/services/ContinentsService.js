import axios from "axios";

class ContinentsService {
  getContinents(filter) {
    const queryParams = new URLSearchParams(filter).toString();
    return axios.get("http://localhost:51417/continents?" + queryParams);
  }
}

export default new ContinentsService();
