import React, {useState} from "react";
import { useParams, useLocation } from 'react-router-dom';
import CountriesISOYService from "../../services/CountriesISOYService";

function CountriesYear() {
    const[countryYear, setCountryYear] = useState({
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
        const response = await CountriesISOYService.getCountriesISOYear(params);
        console.log(response.data);
        setCountryYear({
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

    function deleteEntry(){
      CountriesISOYService.deleteCountriesISOYear(params).then(response => {
        console.log(`Deleted post`);
      })
      .catch(error => {
        console.error(error);
      });
    }

    componentDidMount();

    var isoString = params["iso"];

    return (
      <div>

        <button onClick={deleteEntry}>Delete Entry</button>

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

        <h2>{isoString}</h2>
        {countryYear.year && <h2>Year: {countryYear.year}</h2>}

        <h2>General Data:</h2>
        {countryYear.generalData && (
          <>
            <p>GDP: {countryYear.generalData.gdp}</p>
            <p>Population: {countryYear.generalData.population}</p>
          </>
        )}

        <h2>Emission Data:</h2>
        {countryYear.emissionData && (
          <>
            <p>CO2: {countryYear.emissionData.co2}</p>
            <p>CH4: {countryYear.emissionData.ch4}</p>
            <p>N20: {countryYear.emissionData.n20}</p>
            <p>Total ghg: {countryYear.emissionData.ghg}</p>
          </>
        )}

        <h2>Energy Data:</h2>
        {countryYear.energyData && (
          <>
            <p>Energy_per_cap: {countryYear.energyData.energy_per_cap}</p>
            <p>Energy_per_ghg: {countryYear.emissionData.energy_per_ghg}</p>
          </>
        )}

        <h2>Temperature Data:</h2>
        {countryYear.temperatureData && (
          <>
            <p>Change ghg: {countryYear.temperatureData.change_ghg}</p>
            <p>Change co2: {countryYear.temperatureData.change_co2}</p>
            <p>Change ch4: {countryYear.temperatureData.change_ch4}</p>
            <p>Change n20: {countryYear.temperatureData.change_n20}</p>
            <p>Shares: {countryYear.temperatureData.shares}</p>
          </>
        )}
      </div>
    );
  }

  export default CountriesYear;
