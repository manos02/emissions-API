import React from "react";
import { useParams, useLocation } from 'react-router-dom';
import CountriesService from "../../services/CountriesService";

function withParams(Component) {
  return (props) => {
    const routeParams = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    return <Component {...props} params={routeParams} queryParams={queryParams} />;
  };
}



class Countries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
  }

  componentDidMount() {

    CountriesService.getCountries(this.props.queryParams).then((response) => {
      this.setState({countries : response.data})
    })
  }

  render(){
    return (
    <div>
      <h1>Countries</h1>
      <table border="1px solid">
        <thead>
          <tr>
            <td>Country ISO</td>
            <td>Country Name</td>
          </tr>
        </thead>
        <tbody>
          {
            this.state.countries.map(
              country => (
              <tr key = {country.iso}>
                <td>{country.iso}</td>
                <td>{country.name}</td>
              </tr>
              )
            )
          }
        </tbody>

      </table>

    </div>
    )
  }
}

export default withParams(Countries);