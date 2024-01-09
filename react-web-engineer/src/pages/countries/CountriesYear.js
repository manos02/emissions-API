import React from "react";
import { useParams, useLocation } from 'react-router-dom';
import CountriesISOYService from "../../services/CountriesISOYService";

function withParams(Component) {
  return (props) => {
    const routeParams = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    return <Component {...props} params={routeParams} queryParams={queryParams} />;
  };
}

class CountriesYear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: {
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
    }
  }

  async componentDidMount() {
      try {
        const response = await CountriesISOYService.getCountriesISOYear(this.props.params, this.props.queryParams);
        console.log(response.data);
        this.setState({
          country: {
            year: response.data.year,
            generalData: response.data.generalData,
            emissionData: response.data.emissionData,
            energyData: response.data.energyData,
            temperatureData: response.data.temperatureData,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

  render() {
    const { country } = this.state;

    var isoString = this.props.params["iso"];

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

        <h2>{isoString}</h2>
        {country.year && <h2>Year: {country.year}</h2>}

        <h2>General Data:</h2>
        {country.generalData && (
          <>
            <p>GDP: {country.generalData.gdp}</p>
            <p>Population: {country.generalData.population}</p>
          </>
        )}

        <h2>Emission Data:</h2>
        {country.emissionData && (
          <>
            <p>CO2: {country.emissionData.co2}</p>
            <p>CH4: {country.emissionData.ch4}</p>
            <p>N20: {country.emissionData.n20}</p>
            <p>Total ghg: {country.emissionData.ghg}</p>
          </>
        )}

        <h2>Energy Data:</h2>
        {country.energyData && (
          <>
            <p>Energy_per_cap: {country.energyData.energy_per_cap}</p>
            <p>Energy_per_ghg: {country.emissionData.energy_per_ghg}</p>
          </>
        )}

        <h2>Temperature Data:</h2>
        {country.temperatureData && (
          <>
            <p>Change ghg: {country.temperatureData.change_ghg}</p>
            <p>Change co2: {country.temperatureData.change_co2}</p>
            <p>Change ch4: {country.temperatureData.change_ch4}</p>
            <p>Change n20: {country.temperatureData.change_n20}</p>
            <p>Shares: {country.temperatureData.shares}</p>
          </>
        )}
      </div>
    );
  }
}

  export default withParams(CountriesYear);
