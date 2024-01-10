import React, {useState} from "react";
import { useParams, useLocation, useSearchParams} from 'react-router-dom';
import CountriesISOService from "../../services/CountriesISOService";
import { useNavigate } from "react-router-dom";
import ".././Layout.css";

function CountriesISO(){

  const [country, setCountry] = useState({
    iso: "iso",
    name: "name",
    data: [],
  },
);
  const params = useParams()
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const goRouteISOYear = (iso, year) => {
    navigate(`/countries/${iso}/${year}`);
  };


  const componentDidMount= async() => {
    try {
      const response = await CountriesISOService.getCountriesISO(params, queryParams);
      const {iso, name, data } = response.data;
      setCountry({
          iso: iso,
          name: name,
          data: data,
        }
      );

    } catch (error) {
      console.log(error);
    }
  }
  

  componentDidMount();

    return (
      <div>
        
        <h1>{country.iso}</h1>
        <h1>{country.name}</h1>

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
        <label>
          Lower bound year:
          <input type="text" name="lower" placeholder="Enter lower bound"></input>
        </label>
        <label>
          Upper bound year:
          <input type="text" name="upper" placeholder="Enter upper bound"></input>
        </label>
        <input type="submit" value="Submit" />
      </form>

        {country.data.map((item, index) => (
          <div key={index} className="ISO">

              <a className = 'Layout-button' onClick={()=> goRouteISOYear(country.iso, item.year)}>Year: {item.year}</a>

              <div className="ISO-data">
            
            <div className="ISO-data-items">
              <h2>General Data:</h2>
              <table border="1px solid">
        <thead>
          <tr>
            <td>GDP</td>
            <td>Population</td>
          </tr>
        </thead>
        <tbody>
              <tr>
            <td>{item.generalData.gdp}</td>
            <td>{item.generalData.population}</td>
              </tr>
        </tbody>

      </table>
      </div>
      <div className="ISO-data-items">
            <h2>Emission Data:</h2>
            
            <table border="1px solid">
        <thead>
          <tr>
            <td>co2</td>
            <td>ch4</td>
            <td>n20</td>
            <td>total ghg</td>
          </tr>
        </thead>
        <tbody>
              <tr>
              <td>{item.emissionData.co2}</td>
            <td>{item.emissionData.ch4}</td>
            <td>{item.emissionData.n20}</td>
            <td>{item.emissionData.ghg}</td>
              </tr>
        </tbody>

      </table>
      </div>
      <div className="ISO-data-items">
            <h2>Energy Data:</h2>
            <table border="1px solid">
        <thead>
          <tr>
            <td>Energy_per_cap</td>
            <td>Energy_per_ghg</td>
          </tr>
        </thead>
        <tbody>
              <tr>
            <td>{item.energyData.energy_per_cap}</td>
            <td>{item.energyData.energy_per_ghg}</td>
              </tr>
        </tbody>

      </table>
</div>
      <div className="ISO-data-items">
            <h2>Temperature Data:</h2>
            <table border="1px solid">
        <thead>
          <tr>
            <td>change ghg</td>
            <td>change co2</td>
            <td>change ch4</td>
            <td>change n20</td>
            <td>shares</td>
          </tr>
        </thead>
        <tbody>
              <tr>
              <td>{item.temperatureData.change_ghg}</td>
            <td>{item.temperatureData.change_co2}</td>
            <td>{item.temperatureData.change_ch4}</td>
            <td>{item.temperatureData.change_n20}</td>
            <td>{item.temperatureData.shares}</td>
              </tr>
        </tbody>

      </table>
      </div>
      </div>
      <a>--------------</a>
          </div>
        ))}
        
      </div>
    );
  }


export default CountriesISO;
