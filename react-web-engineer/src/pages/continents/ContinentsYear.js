import React, {useState} from "react";
import { useParams, useLocation } from 'react-router-dom';
import ContinentsNameYearService from "../../services/ContinentsNameYearService";


function ContinentsYear(){
  const[continentYear, setContinentYear] = useState({
    year: 0,
    generalData: {
      gdp: 0,
      population: 0,
    },
    emissionData: {
      co2: 0,
      ch4: 0,
      n20: 0,
      ghg: 0,
    },
    energyData: {
      energy_per_cap: 0,
      energy_per_ghg: 0,
    },
    temperatureData: {
      change_ghg: 0,
      change_co2: 0,
      change_ch4: 0,
      change_n20: 0,
      shares: 0,
    },
  }
)

const params = useParams();


const componentDidMount = async() => {
  try {
    const response = await ContinentsNameYearService.getContinentsNameYear(params);
    console.log(response.data);
    setContinentYear({
        year: response.data.year,
        generalData: response.data.generalData,
        emissionData: response.data.emissionData,
        energyData: response.data.energyData,
        temperatureData: response.data.temperatureData,
      },
    );
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

componentDidMount();

var nameString = params["name"];


  return (
  <div>

  <form>
    <label>
      Datatype returned:
      <select name="dataType">
        <option value="4">FullData</option>
        <option value="1">Emission data</option>
        <option value="2">Energy Data</option>
        <option value="3">General Data</option>
        <option value="0">Temperature Data</option>
      </select>
    </label>
    <input type="submit" value="Submit" />
  </form>

    <h2>{nameString}</h2>
    {continentYear.year && <h2>Year: {continentYear.year}</h2>}

    <h2>General Data:</h2>
    {continentYear.generalData && (
      <>
        <p>GDP: {continentYear.generalData.gdp}</p>
        <p>Population: {continentYear.generalData.population}</p>
      </>
    )}

    <h2>Emission Data:</h2>
    {continentYear.emissionData && (
      <>
        <p>CO2: {continentYear.emissionData.co2}</p>
        <p>CH4: {continentYear.emissionData.ch4}</p>
        <p>N20: {continentYear.emissionData.n20}</p>
        <p>Total ghg: {continentYear.emissionData.ghg}</p>
      </>
    )}

    <h2>Energy Data:</h2>
    {continentYear.energyData && (
      <>
        <p>Energy_per_cap: {continentYear.energyData.energy_per_cap}</p>
        <p>Energy_per_ghg: {continentYear.emissionData.energy_per_ghg}</p>
      </>
    )}

    <h2>Temperature Data:</h2>
    {continentYear.temperatureData && (
      <>
        <p>Change ghg: {continentYear.temperatureData.change_ghg}</p>
        <p>Change co2: {continentYear.temperatureData.change_co2}</p>
        <p>Change ch4: {continentYear.temperatureData.change_ch4}</p>
        <p>Change n20: {continentYear.temperatureData.change_n20}</p>
        <p>Shares: {continentYear.temperatureData.shares}</p>
      </>
    )}
  </div>
);
}

export default ContinentsYear;