import React, { useState } from "react";
import ContinentsService from "../../services/ContinentsService";
import { useLocation, useNavigate } from "react-router-dom";
import ".././Layout.css";

function Continents() {
  const [continents, setContinents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const goRouteName = (name) => {
    navigate(`/continents/${name}`);
  };

  const componentDidMount = async () => {
    try {
      const response = await ContinentsService.getContinents(queryParams);
      setContinents(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      if (error.message === "Request failed with status code 404") {
        alert(`${error.message}. No data to show`);
      } else if (error.message === "Request failed with status code 400") {
        alert(`${error.message}. Please enter proper query parameters :)`);
      } else {
        alert(`${error.message}. Please fix before proceeding.`);
      }
    }
  };

  componentDidMount();

  return (
    <div>
      <div>
        <h1>Continents</h1>
        <div className="FORM">
          <a style={{ fontWeight: "bold" }}>FILTER THE DATA</a>
          <form>
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
              <input
                type="text"
                name="offset"
                placeholder="Enter offset"
              ></input>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
      <table border="1px solid" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <td>Continent Name</td>
          </tr>
        </thead>
        <tbody>
          {continents.map((continent) => (
            <tr key={continent} onClick={() => goRouteName(continent)}>
              <td className="clickable">{continent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Continents;
