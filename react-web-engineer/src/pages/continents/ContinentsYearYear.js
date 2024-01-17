import ContinentsNameYYService from "../../services/ContinentsNameYYService";
import React, {useState} from "react";
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ".././Layout.css";

function ContinentsYearYear() {
  const[continentsYY, setContinentsYY] = useState([]);
  const routeParams = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  

  const goRouteISO = (iso) => {
    navigate(`/continents/${iso}`);
  };

  const componentDidMount= async() => {
    try {
      const response = await ContinentsNameYYService.getContinentNameYY(routeParams, queryParams);
      setContinentsYY(response.data);

    } catch (error) {
      console.error("Error fetching data:", error.message);
      if(error.message==="Request failed with status code 404"){
        alert(`${error.message}. Please enter a proper year with at least one data entry :)`)
      } else if (error.message==="Request failed with status code 400"){
        alert(`${error.message}. Please enter proper query parameters :)`)
      } else{
        alert(`${error.message}. Please fix before proceeding.`)
      }
    }

  }

  componentDidMount();


  return (
    <div>
      <h2>All Continents for year: {routeParams["year"]}</h2>

      <div className="FORM">
        <a>FILTER THE DATA</a>
      <form>
        <label>
          Filter by:
          <select name="filter">
            <option value="name">Name</option>
            <option value="pop">Population</option>
          </select>
        </label>
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
        <label>
          Lower bound population:
          <input type="text" name="lower" placeholder="Enter lower bound"></input>
        </label>
        <label>
          Upper bound population:
          <input type="text" name="upper" placeholder="Enter upper bound"></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>

    {continentsYY.map((item, index) => (
      <div key={index} className="country-card">
        <h2 onClick={()=> goRouteISO(item.name)}>Name: {item.name}</h2>

        <div className="section">
          <h3>General Data:</h3>
          <p>GDP: {item.data[0].generalData.gdp}</p>
          <p>Population: {item.data[0].generalData.population}</p>
        </div>

        <div className="section">
          <h3>Emission Data:</h3>
          <p>CO2: {item.data[0].emissionData.co2}</p>
          <p>CH4: {item.data[0].emissionData.ch4}</p>
          <p>N20: {item.data[0].emissionData.n20}</p>
          <p>Total ghg: {item.data[0].emissionData.ghg}</p>
        </div>

        <div className="section">
          <h3>Energy Data:</h3>
          <p>Energy_per_cap: {item.data[0].energyData.energy_per_cap}</p>
          <p>Energy_per_ghg: {item.data[0].energyData.energy_per_ghg}</p>
        </div>

        <div className="section">
          <h3>Temperature Data:</h3>
          <p>Change ghg: {item.data[0].temperatureData.change_ghg}</p>
          <p>Change co2: {item.data[0].temperatureData.change_co2}</p>
          <p>Change ch4: {item.data[0].temperatureData.change_ch4}</p>
          <p>Change n20: {item.data[0].temperatureData.change_n20}</p>
          <p>Shares: {item.data[0].temperatureData.shares}</p>
        </div>
      </div>
    ))}
  </div>
);

}

export default ContinentsYearYear;