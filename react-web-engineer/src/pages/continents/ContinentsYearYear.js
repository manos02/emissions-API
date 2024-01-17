import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import ContinentsNameYYService from "../../services/ContinentsNameYYService";
import { useNavigate } from "react-router-dom";
import ".././Layout.css";

function ContinentsYearYear() {
  const [continentsYY, setContinentsYY] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const routeParams = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [dataTypeForm, setDataTypeForm] = useState(4);
  const navigate = useNavigate();

  const goRouteName = (name) => {
    navigate(`/continents/${name}`);
  };

  useEffect(() => {
    const fetchContinents = async () => {
      try {
        const response = await ContinentsNameYYService.getContinentNameYY(
          routeParams,
          queryParams,
        );
        setContinentsYY(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        if (error.message === "Request failed with status code 404") {
          alert(
            `${error.message}. Please enter a proper year with at least one data entry :)`,
          );
        } else if (error.message === "Request failed with status code 400") {
          alert(`${error.message}. Please enter proper query parameters :)`);
        } else {
          alert(`${error.message}. Please fix before proceeding.`);
        }
      }
    };
    fetchContinents();
  }, [routeParams, queryParams]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = continentsYY.slice(firstItemIndex, lastItemIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(continentsYY.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  function handleGeneralData(item){
    return(
    <div>
      <table className="year-table" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>GDP</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
            <td>{item.data[0].generalData.gdp}</td>
            <td>{item.data[0].generalData.population}</td>
        </tbody>
      </table>
    </div>)
  }

  function handleEmissionData(item){
    return(
      <div>
        <table className="year-table" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>CO2 Emissions</th>
              <th>CO4 Emissions</th>
              <th>N20 Emissions</th>
              <th>GHG Emissions</th>
            </tr>
          </thead>
          <tbody>
            <td>{item.data[0].emissionData.co2}</td>
            <td>{item.data[0].emissionData.ch4}</td>
            <td>{item.data[0].emissionData.n20}</td>
            <td>{item.data[0].emissionData.ghg}</td>
          </tbody>
        </table>
      </div>)
  }

  function handleEnergyData(item){
    return(
      <div>
        <table className="year-table" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Energy per capita</th>
              <th>Energy per GHG</th>
            </tr>
          </thead>
          <tbody>
            <td>{item.data[0].energyData.energy_per_cap}</td>
            <td>{item.data[0].energyData.energy_per_ghg}</td>
          </tbody>
        </table>
      </div>)
  }

  function handleTemperatureData(item){
    return(
      <div>
        <table className="year-table" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Change GHG</th>
              <th>Change CO2</th>
              <th>Change CO4</th>
              <th>Change N20</th>
              <th>Share GHG</th>
            </tr>
          </thead>
          <tbody>
            <td>{item.data[0].temperatureData.change_ghg}</td>
            <td>{item.data[0].temperatureData.change_co2}</td>
            <td>{item.data[0].temperatureData.change_ch4}</td>
            <td>{item.data[0].temperatureData.change_n20}</td>
            <td>{item.data[0].temperatureData.shares}</td>
          </tbody>
        </table>
      </div>)
  }

  function handleOptions(item){

    if(dataTypeForm==0){
       return handleGeneralData(item)
    } else
    if(dataTypeForm==1){
       return handleEmissionData(item)
    } else
    if(dataTypeForm==2){
      return handleEnergyData(item)
    } else
    if(dataTypeForm==3){
      return handleTemperatureData(item)
    } else {
      return (<div className="ISO-data">
        
      {handleGeneralData(item)}
      {handleEmissionData(item)}
      {handleEnergyData(item)}
      {handleTemperatureData(item)}
      </div>)
    }
  }

  function handleDataTypeForm(event){
    setDataTypeForm(event.target.value);
  }


  return (
    <div>
      <h1>All Continents for year: {routeParams["year"]}</h1>
      <div className="FORM">
        <a style={{ fontWeight: "bold" }}>FILTER THE DATA</a>
        <form>
          <label>
            Datatype returned:
            <select onChange={handleDataTypeForm}>
              <option value="4">FullData</option>
              <option value="0">General data</option>
              <option value="1">Emission Data</option>
              <option value="2">Energy Data</option>
              <option value="3">Temperature Data</option>
            </select>
          </label>
          <label>
            Filter by:
            <select name="filter">
              <option value="name">Name</option>
              <option value="pop">Population</option>
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
            Lower bound population:
            <input
              type="text"
              name="lower"
              placeholder="Enter lower bound"
            ></input>
          </label>
          <label>
            Upper bound population:
            <input
              type="text"
              name="upper"
              placeholder="Enter upper bound"
            ></input>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>

      <table className="year-table">
      <thead>
          <tr>
            <th>Name</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td onClick={() => goRouteName(item.name)}>{item.name}</td>
              {handleOptions(item)}
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} style={{ display: "inline", marginRight: "10px" }}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  paginate(number);
                }}
                href="!#"
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default ContinentsYearYear;
