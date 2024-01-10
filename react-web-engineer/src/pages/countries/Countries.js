import React, { useState } from "react";
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import CountriesService from "../../services/CountriesService";
import { useNavigate } from "react-router-dom";

function Countries() {
    const [countries, setCountries] = useState([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  
    const componentDidMount = () => {

    CountriesService.getCountries(queryParams).then((response) => {
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

      <form>
        <label>
          Filter by:
          <select name="filter">
            <option value="name">Name</option>
            <option value="ISO">ISO</option>
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
        <input type="submit" value="Submit" />
      </form>

      <form>
        <label>
          Enter a new country ISO:
          <input type="text" placeholder="Enter ISO" required="true"></input>
        </label>
        <label>
          Enter a new country name:
          <input type="text" placeholder="Enter name" required="true"></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
      

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

export default Countries;