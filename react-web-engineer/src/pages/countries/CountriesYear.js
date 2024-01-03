import React from "react";
import { useParams } from 'react-router-dom';
import CountriesISOYService from "../../services/CountriesISOYService";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
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
        const response = await CountriesISOYService.getCountriesISOYear(this.props.params);;

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
      return (
        <div>
          <h2>Year: {this.state.country.year}</h2>

          <h2>General Data:</h2>
          <p>GDP: {this.state.country.generalData.gdp}</p>
          <p>Population: {this.state.country.generalData.population}</p>

          <h2>Emission Data:</h2>
          <p>CO2: {this.state.country.emissionData.co2}</p>
          <p>CH4: {this.state.country.emissionData.ch4}</p>
          <p>N20: {this.state.country.emissionData.n20}</p>
          <p>Total ghg: {this.state.country.emissionData.ghg}</p>

          <h2>Energy Data:</h2>
          <p>Energy_per_cap: {this.state.country.energyData.energy_per_cap}</p>
          <p>Energy_per_ghg: {this.state.country.emissionData.energy_per_ghg}</p>

          <h2>Temperature Data:</h2>
          <p>Change ghg: {this.state.country.temperatureData.change_ghg}</p>
          <p>Change co2: {this.state.country.temperatureData.change_co2}</p>
          <p>Change ch4: {this.state.country.temperatureData.change_ch4}</p>
          <p>Change n20: {this.state.country.temperatureData.change_n20}</p>
          <p>Shares: {this.state.country.temperatureData.shares}</p>
        </div>
      );
    }
  }

  export default withParams(CountriesYear);
