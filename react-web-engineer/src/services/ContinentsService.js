import axios from 'axios';

class ContinentsService {

  getContinents() {
    return (axios.get('http://localhost:51417/continents'));
  }

}

export default new ContinentsService;