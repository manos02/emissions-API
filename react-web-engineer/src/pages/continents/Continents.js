import React, {useState} from "react";
import ContinentsService from "../../services/ContinentsService";
import { useLocation, useNavigate } from "react-router-dom";

function Continents() {
      const [continents, setContinents] = useState([]);
      const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const goRouteName = (name) => {
    navigate(`/continents/${name}`);
  };

  

  const componentDidMount= ()=>{
    ContinentsService.getContinents(queryParams).then((response) => {
      setContinents(response.data)
    })
  }


  componentDidMount();

    return (
    <div>
      <div>
        <h1>Continents</h1>
        
        <form>
        <label>
          Order:
          <select name="order">
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </label>
        <label>
          Limit of items returned:
          <input type="text" name="limit" placeholder="Enter limit"></input>
        </label>
        <label>
          Offset of items:
          <input type="text" name="offset" placeholder="Enter offset"></input>
        </label>
        <input type="submit" value="Submit" />
      </form>

      </div>
      <table border="1px solid">
        <thead>
          <tr>
            <td>Continent Name</td>
          </tr>
        </thead>
        <tbody>
          {
            continents.map(
              continent => (
              <tr key = {continent} onClick={()=> goRouteName(continent)}>
                <td>{continent}</td>
              </tr>
              )
            )
          }
        </tbody>

      </table>

    </div>
    )
  

}




export default Continents;