import React, { useState } from "react";
import { useParams, useLocation } from 'react-router-dom';
import CountriesService from "../../services/CountriesService";
import { useNavigate } from "react-router-dom";



function withParams(Component) {
  return (props) => {
    const routeParams = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    return <Component {...props} params={routeParams} queryParams={queryParams} />;
  };
}

function Countries() {
    const [countries, setCountries] = useState([]);

  const componentDidMount = () => {

    CountriesService.getCountries().then((response) => {
      console.log(response.data)
      setCountries(response.data)
    })
  };


  const navigate = useNavigate();

  const goRouteISO = (iso) => {
    navigate(`/countries/${iso}`);
  };

  componentDidMount();

  
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
            countries.map(
              country => (
              <tr key = {country.iso} onClick={()=> goRouteISO(country.iso)}>
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

export default withParams(Countries);