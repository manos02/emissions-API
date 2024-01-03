import React from "react";
import { useParams } from 'react-router-dom';
import CountriesISOService from "../../services/CountriesISOService";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class CountriesISO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: {
        iso: "iso",
        name: "name",
        data: [],
      },
    };
  }

  async componentDidMount() {
    try {
      console.log(this.props.params);
      const response = await CountriesISOService.getCountriesISO(this.props.params);
      const { iso, name, data } = response.data;

      this.setState({
        country: {
          iso: iso,
          name: name,
          data: data,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.country.iso}</h1>
        <h1>{this.state.country.name}</h1>

        {this.state.country.data.map((item, index) => (
          <div key={index}>
            <h2>Year: {item.year}</h2>
            <h2>General Data:</h2>
            <p>GDP: {item.generalData.gdp}</p>
            <p>Population: {item.generalData.population}</p>

            <h2>Emission Data:</h2>
            <p>CO2: {item.emissionData.co2}</p>
            <p>CH4: {item.emissionData.ch4}</p>
            <p>N20: {item.emissionData.n20}</p>
            <p>Total ghg: {item.emissionData.ghg}</p>

            <h2>Energy Data:</h2>
            <p>Energy_per_cap: {item.energyData.energy_per_cap}</p>
            <p>Energy_per_ghg: {item.emissionData.energy_per_ghg}</p>

            <h2>Temperature Data:</h2>
            <p>Change ghg: {item.temperatureData.change_ghg}</p>
            <p>Change co2: {item.temperatureData.change_co2}</p>
            <p>Change ch4: {item.temperatureData.change_ch4}</p>
            <p>Change n20: {item.temperatureData.change_n20}</p>
            <p>Shares: {item.temperatureData.shares}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default withParams(CountriesISO);
