import ContinentsNameYYService from "../../services/ContinentsNameYYService";
import React, {useState} from "react";
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function ContinentsYearYear() {
  const[continentsYY, setContinentsYY] = useState([]);
  const routeParams = useParams();
  const navigate = useNavigate();

  const goRouteISO = (iso) => {
    navigate(`/continents/${iso}`);
  };

  const componentDidMount= async() => {
    try {
      const response = await ContinentsNameYYService.getContinentNameYY(routeParams);
      setContinentsYY(response.data);

    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  componentDidMount();


  return (
    <div>
    {continentsYY.map((item, index) => (
      <div key={index} className="country-card">
        <h2 onClick={()=> goRouteISO(item.iso)}>Name: {item.name}</h2>

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