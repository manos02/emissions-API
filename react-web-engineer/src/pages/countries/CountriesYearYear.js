import React from "react";
import { useParams, useLocation } from 'react-router-dom';
import CountriesISOYYService from "../../services/CountriesISOYYService";

function withParams(Component) {
  return (props) => {
    const routeParams = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    return <Component {...props} params={routeParams} queryParams={queryParams} />;
  };
}

class CountriesYY extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesYY : []
    }
  }

  async componentDidMount() {
    try {
      const response = await CountriesISOYYService.getCountriesYY(this.props.params, this.props.queryParams);
      this.setState({ countriesYY: response.data });

    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  render() {
    return (
      <div>
        {this.state.countriesYY.map((item, index) => (
          <div key={index} className="country-card">
            <h2>Name: {item.name}</h2>

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
}

export default withParams(CountriesYY);
