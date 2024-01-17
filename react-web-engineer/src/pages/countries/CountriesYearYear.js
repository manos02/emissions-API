import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import CountriesISOYYService from "../../services/CountriesISOYYService";
import { useNavigate } from "react-router-dom";
import ".././Layout.css";

function CountriesYY() {
  const [countriesYY, setCountriesYY] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const routeParams = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const goRouteISO = (iso) => {
    navigate(`/countries/${iso}`);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await CountriesISOYYService.getCountriesYY(
          routeParams,
          queryParams,
        );
        setCountriesYY(response.data);
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
    fetchCountries();
  }, [routeParams, queryParams]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = countriesYY.slice(firstItemIndex, lastItemIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(countriesYY.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1>All Countries for year: {routeParams["year"]}</h1>
      <div className="FORM">
        <thead>
          <a style={{ fontWeight: "bold" }}>FILTER THE DATA</a>
        </thead>
        <form>
          <label>
            Filter by:
            <select name="filter">
              <option value="name">Name</option>
              <option value="shareghg">Share of GHG</option>
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
      <table className="year-table" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>ISO</th>
            <th>GDP</th>
            <th>Population</th>
            <th>CO2 Emissions</th>
            <th>CO4 Emissions</th>
            <th>N20 Emissions</th>
            <th>GHG Emissions</th>
            <th>Energy per capita</th>
            <th>Energy per GHG</th>
            <th>Change GHG</th>
            <th>Change CO2</th>
            <th>Change CO4</th>
            <th>Change N20</th>
            <th>Share GHG</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td onClick={() => goRouteISO(item.iso)}>{item.name}</td>
              <td onClick={() => goRouteISO(item.iso)}>{item.iso}</td>
              <td>{item.data[0].generalData.gdp}</td>
              <td>{item.data[0].generalData.population}</td>
              <td>{item.data[0].emissionData.co2}</td>
              <td>{item.data[0].emissionData.ch4}</td>
              <td>{item.data[0].emissionData.n20}</td>
              <td>{item.data[0].emissionData.ghg}</td>
              <td>{item.data[0].energyData.energy_per_cap}</td>
              <td>{item.data[0].energyData.energy_per_ghg}</td>
              <td>{item.data[0].temperatureData.change_ghg}</td>
              <td>{item.data[0].temperatureData.change_co2}</td>
              <td>{item.data[0].temperatureData.change_ch4}</td>
              <td>{item.data[0].temperatureData.change_n20}</td>
              <td>{item.data[0].temperatureData.shares}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
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

export default CountriesYY;
