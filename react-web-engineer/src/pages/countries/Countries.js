import React, { useState } from "react";
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import CountriesService from "../../services/CountriesService";
import { useNavigate } from "react-router-dom";
import ".././Layout.css";

function Countries() {
    const [countries, setCountries] = useState([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  
    const componentDidMount = async() => {

    try {
      const response = await CountriesService.getCountries(queryParams);
      setCountries(response.data)
    } catch (error) {
      console.error("Error fetching data:", error.message);
      if (error.message==="Request failed with status code 404") {
        alert(`${error.message}. No data to show :)`)
      } else if (error.message==="Request failed with status code 400") {
        alert(`${error.message}. Please enter proper query parameters :)`)
      } else {
        alert(`${error.message}. Please fix before proceeding.`)
      }
    }
  };


  const navigate = useNavigate();

  const goRouteISO = (iso) => {
    navigate(`/countries/${iso}`);
  };

  componentDidMount();
  
    return (
      
    <div>

      <h1>Countries</h1>
      <div className="FORM">
        <h>FILTER THE DATA</h>
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
      </div>
      

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