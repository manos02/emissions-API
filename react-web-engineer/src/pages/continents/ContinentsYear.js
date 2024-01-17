import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ContinentsNameYearService from "../../services/ContinentsNameYearService";
import ".././Layout.css";

function ContinentsYear() {
  const [continentYear, setContinentYear] = useState({
    year: 0,
    generalData: {
      gdp: 0,
      population: 0,
      year: 0,
    },
    emissionData: {
      co2: 0,
      ch4: 0,
      n20: 0,
      ghg: 0,
      year: 0,
    },
    energyData: {
      energy_per_cap: 0,
      energy_per_ghg: 0,
      year: 0,
    },
    temperatureData: {
      change_ghg: 0,
      change_co2: 0,
      change_ch4: 0,
      change_n20: 0,
      shares: 0,
      year: 0,
    },
  });

  const [tempcountryYear, setTempCountryYear] = useState({
    isInit: false,
    data: {
      year: continentYear.year,
      generalData: continentYear.generalData,
      emissionData: continentYear.emissionData,
      energyData: continentYear.energyData,
      temperatureData: continentYear.temperatureData,
    },
  });

  const [hasError, setHasError] = useState(0);
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  var formData = queryParams.get("dataType");

  const componentDidMount = async () => {
    try {
      const response =
        await ContinentsNameYearService.getContinentsNameYear(params);
      console.log(response.data);
      setContinentYear({
        year: response.data.year,
        generalData: response.data.generalData,
        emissionData: response.data.emissionData,
        energyData: response.data.energyData,
        temperatureData: response.data.temperatureData,
      });
    } catch (error) {
      console.error("Error fetching data:", error.message);
      if (error.message === "Request failed with status code 404") {
        setHasError(1);
      } else if (error.message === "Request failed with status code 400") {
        alert(`${error.message}. Please enter proper query parameters :)`);
      } else {
        alert(`${error.message}. Please fix before proceeding.`);
      }
    }
  };

  componentDidMount();

  var nameString = params["name"];
  var yearString = params["year"];

  function handleError() {
    return (
      <div className="error-container">
        <p className="error-message">
          <span className="error-icon">⚠️</span>
          No entry for {nameString} with year {yearString} :(
        </p>
      </div>
    );
  }

  function deleteEntry() {
    ContinentsNameYearService.deleteContinentsNameYear(params)
      .then((response) => {
        console.log(`Deleted post`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleGeneralData() {
    return (
      <div className="data-cont">
        <h2>General Data:</h2>
        {continentYear.generalData && (
          <>
            <p>GDP: {continentYear.generalData.gdp}</p>
            <p>Population: {continentYear.generalData.population}</p>
          </>
        )}
      </div>
    );
  }

  function handleEmissionData() {
    return (
      <div className="data-cont">
        <h2>Emission Data:</h2>
        {continentYear.emissionData && (
          <>
            <p>CO2: {continentYear.emissionData.co2}</p>
            <p>CH4: {continentYear.emissionData.ch4}</p>
            <p>N20: {continentYear.emissionData.n20}</p>
            <p>Total ghg: {continentYear.emissionData.ghg}</p>
          </>
        )}
      </div>
    );
  }

  function handleEnergyData() {
    return (
      <div className="data-cont">
        <h2>Energy Data:</h2>
        {continentYear.energyData && (
          <>
            <p>Energy_per_cap: {continentYear.energyData.energy_per_cap}</p>
            <p>Energy_per_ghg: {continentYear.energyData.energy_per_ghg}</p>
          </>
        )}
      </div>
    );
  }

  function handleTemperatureData() {
    return (
      <div className="data-cont">
        <h2>Temperature Data:</h2>
        {continentYear.temperatureData && (
          <>
            <p>Change ghg: {continentYear.temperatureData.change_ghg}</p>
            <p>Change co2: {continentYear.temperatureData.change_co2}</p>
            <p>Change ch4: {continentYear.temperatureData.change_ch4}</p>
            <p>Change n20: {continentYear.temperatureData.change_n20}</p>
            <p>Shares: {continentYear.temperatureData.shares}</p>
          </>
        )}
      </div>
    );
  }

  function handleDataTypes() {
    if (formData == 0) {
      return handleGeneralData();
    } else if (formData == 1) {
      return handleEmissionData();
    } else if (formData == 2) {
      return handleEnergyData();
    } else if (formData == 3) {
      return handleTemperatureData();
    } else {
      return (
        <div>
          {handleGeneralData()}

          {handleEmissionData()}

          {handleEnergyData()}

          {handleTemperatureData()}
        </div>
      );
    }
  }

  function handleGDP(event) {
    if (!tempcountryYear.isInit) {
      setTempCountryYear({
        isInit: true,
        data: {
          year: continentYear.year,
          generalData: {
            gdp: event.target.value,
            population: continentYear.generalData.population,
            year: continentYear.generalData.year,
          },
          emissionData: continentYear.emissionData,
          energyData: continentYear.energyData,
          temperatureData: continentYear.temperatureData,
        },
      });
    } else {
      setTempCountryYear({
        isInit: tempcountryYear.isInit,
        data: {
          year: tempcountryYear.data.year,
          generalData: {
            gdp: event.target.value,
            population: tempcountryYear.data.generalData.population,
            year: tempcountryYear.data.generalData.year,
          },
          emissionData: tempcountryYear.data.emissionData,
          energyData: tempcountryYear.data.energyData,
          temperatureData: tempcountryYear.data.temperatureData,
        },
      });
    }
  }

  function handlePopulation(event) {
    if (!tempcountryYear.isInit) {
      setTempCountryYear({
        isInit: true,
        data: {
          year: continentYear.year,
          generalData: {
            gdp: continentYear.generalData.gdp,
            population: event.target.value,
            year: continentYear.generalData.year,
          },
          emissionData: continentYear.emissionData,
          energyData: continentYear.energyData,
          temperatureData: continentYear.temperatureData,
        },
      });
    } else {
      setTempCountryYear({
        isInit: tempcountryYear.isInit,
        data: {
          year: tempcountryYear.data.year,
          generalData: {
            gdp: tempcountryYear.data.generalData.gdp,
            population: event.target.value,
            year: tempcountryYear.data.generalData.year,
          },
          emissionData: tempcountryYear.data.emissionData,
          energyData: tempcountryYear.data.energyData,
          temperatureData: tempcountryYear.data.temperatureData,
        },
      });
    }
  }

  function handleCO2(event) {
    if (!tempcountryYear.isInit) {
      setTempCountryYear({
        isInit: true,
        data: {
          year: continentYear.year,
          generalData: continentYear.generalData,
          emissionData: {
            co2: event.target.value,
            ch4: continentYear.emissionData.ch4,
            n20: continentYear.emissionData.n20,
            ghg: continentYear.emissionData.ghg,
            year: continentYear.emissionData.year,
          },
          energyData: continentYear.energyData,
          temperatureData: continentYear.temperatureData,
        },
      });
    } else {
      setTempCountryYear({
        isInit: tempcountryYear.isInit,
        data: {
          year: tempcountryYear.data.year,
          generalData: tempcountryYear.data.generalData,
          emissionData: {
            co2: event.target.value,
            ch4: tempcountryYear.data.emissionData.ch4,
            n20: tempcountryYear.data.emissionData.n20,
            ghg: tempcountryYear.data.emissionData.ghg,
            year: tempcountryYear.data.emissionData.year,
          },
          energyData: tempcountryYear.data.energyData,
          temperatureData: tempcountryYear.data.temperatureData,
        },
      });
    }
  }

  function handleCH4(event) {
    if (!tempcountryYear.isInit) {
      setTempCountryYear({
        isInit: true,
        data: {
          year: continentYear.year,
          generalData: continentYear.generalData,
          emissionData: {
            co2: continentYear.emissionData.co2,
            ch4: event.target.value,
            n20: continentYear.emissionData.n20,
            ghg: continentYear.emissionData.ghg,
            year: continentYear.emissionData.year,
          },
          energyData: continentYear.energyData,
          temperatureData: continentYear.temperatureData,
        },
      });
    } else {
      setTempCountryYear({
        isInit: tempcountryYear.isInit,
        data: {
          year: tempcountryYear.data.year,
          generalData: tempcountryYear.data.generalData,
          emissionData: {
            co2: tempcountryYear.data.emissionData.co2,
            ch4: event.target.value,
            n20: tempcountryYear.data.emissionData.n20,
            ghg: tempcountryYear.data.emissionData.ghg,
            year: tempcountryYear.data.emissionData.year,
          },
          energyData: tempcountryYear.data.energyData,
          temperatureData: tempcountryYear.data.temperatureData,
        },
      });
    }
  }

  function handleN20(event) {
    if (!tempcountryYear.isInit) {
      setTempCountryYear({
        isInit: true,
        data: {
          year: continentYear.year,
          generalData: continentYear.generalData,
          emissionData: {
            co2: continentYear.emissionData.co2,
            ch4: continentYear.emissionData.ch4,
            n20: event.target.value,
            ghg: continentYear.emissionData.ghg,
            year: continentYear.emissionData.year,
          },
          energyData: continentYear.energyData,
          temperatureData: continentYear.temperatureData,
        },
      });
    } else {
      setTempCountryYear({
        isInit: tempcountryYear.isInit,
        data: {
          year: tempcountryYear.data.year,
          generalData: tempcountryYear.data.generalData,
          emissionData: {
            co2: tempcountryYear.data.emissionData.co2,
            ch4: tempcountryYear.data.emissionData.ch4,
            n20: event.target.value,
            ghg: tempcountryYear.data.emissionData.ghg,
            year: tempcountryYear.data.emissionData.year,
          },
          energyData: tempcountryYear.data.energyData,
          temperatureData: tempcountryYear.data.temperatureData,
        },
      });
    }
  }

  function handleGHG(event) {
    if (!tempcountryYear.isInit) {
      setTempCountryYear({
        isInit: true,
        data: {
          year: continentYear.year,
          generalData: continentYear.generalData,
          emissionData: {
            co2: continentYear.emissionData.co2,
            ch4: continentYear.emissionData.ch4,
            n20: continentYear.emissionData.n20,
            ghg: event.target.value,
            year: continentYear.emissionData.year,
          },
          energyData: continentYear.energyData,
          temperatureData: continentYear.temperatureData,
        },
      });
    } else {
      setTempCountryYear({
        isInit: tempcountryYear.isInit,
        data: {
          year: tempcountryYear.data.year,
          generalData: tempcountryYear.data.generalData,
          emissionData: {
            co2: tempcountryYear.data.emissionData.co2,
            ch4: tempcountryYear.data.emissionData.ch4,
            n20: tempcountryYear.data.emissionData.n20,
            ghg: event.target.value,
            year: tempcountryYear.data.emissionData.year,
          },
          energyData: tempcountryYear.data.energyData,
          temperatureData: tempcountryYear.data.temperatureData,
        },
      });
    }
  }

  function handleEnergyPerCap(event) {
    if (!tempcountryYear.isInit) {
      setTempCountryYear({
        isInit: true,
        data: {
          year: continentYear.year,
          generalData: continentYear.generalData,
          emissionData: continentYear.emissionData,
          energyData: {
            energy_per_cap: event.target.value,
            energy_per_ghg: continentYear.energyData.energy_per_ghg,
            year: continentYear.year,
          },
          temperatureData: continentYear.temperatureData,
        },
      });
    } else {
      setTempCountryYear({
        isInit: tempcountryYear.isInit,
        data: {
          year: tempcountryYear.data.year,
          generalData: tempcountryYear.data.generalData,
          emissionData: tempcountryYear.data.emissionData,
          energyData: {
            energy_per_cap: event.target.value,
            energy_per_ghg: tempcountryYear.data.energyData.energy_per_ghg,
            year: tempcountryYear.data.year,
          },
          temperatureData: tempcountryYear.data.temperatureData,
        },
      });
    }
    console.log(tempcountryYear.data.energyData.energy_per_ghg);
    console.log(tempcountryYear.data.energyData);
  }

  function handleEnergyPerGHG(event) {
    if (!tempcountryYear.isInit) {
      setTempCountryYear({
        isInit: true,
        data: {
          year: continentYear.year,
          generalData: continentYear.generalData,
          emissionData: continentYear.emissionData,
          energyData: {
            energy_per_cap: continentYear.energyData.energy_per_cap,
            energy_per_ghg: event.target.value,
            year: continentYear.year,
          },
          temperatureData: continentYear.temperatureData,
        },
      });
    } else {
      setTempCountryYear({
        isInit: tempcountryYear.isInit,
        data: {
          year: tempcountryYear.data.year,
          generalData: tempcountryYear.data.generalData,
          emissionData: tempcountryYear.data.emissionData,
          energyData: {
            energy_per_cap: tempcountryYear.data.energyData.energy_per_cap,
            energy_per_ghg: event.target.value,
            year: tempcountryYear.data.year,
          },
          temperatureData: tempcountryYear.data.temperatureData,
        },
      });
    }
  }

  function handleChangeGHG(event) {
    if (!tempcountryYear.isInit) {
      setTempCountryYear({
        isInit: true,
        data: {
          year: continentYear.year,
          generalData: continentYear.generalData,
          emissionData: continentYear.emissionData,
          energyData: continentYear.energyData,
          temperatureData: {
            change_ghg: event.target.value,
            change_co2: continentYear.temperatureData.change_co2,
            change_ch4: continentYear.temperatureData.change_ch4,
            change_n20: continentYear.temperatureData.change_n20,
            shares: continentYear.temperatureData.shares,
            year: continentYear.year,
          },
        },
      });
    } else {
      setTempCountryYear({
        isInit: tempcountryYear.isInit,
        data: {
          year: tempcountryYear.data.year,
          generalData: tempcountryYear.data.generalData,
          emissionData: tempcountryYear.data.emissionData,
          energyData: tempcountryYear.data.energyData,
          temperatureData: {
            change_ghg: event.target.value,
            change_co2: tempcountryYear.data.temperatureData.change_co2,
            change_ch4: tempcountryYear.data.temperatureData.change_ch4,
            change_n20: tempcountryYear.data.temperatureData.change_n20,
            shares: tempcountryYear.data.temperatureData.shares,
            year: tempcountryYear.data.year,
          },
        },
      });
    }
  }

  function handleChangeCO2(event) {
    if (!tempcountryYear.isInit) {
      setTempCountryYear({
        isInit: true,
        data: {
          year: continentYear.year,
          generalData: continentYear.generalData,
          emissionData: continentYear.emissionData,
          energyData: continentYear.energyData,
          temperatureData: {
            change_ghg: continentYear.temperatureData.change_ghg,
            change_co2: event.target.value,
            change_ch4: continentYear.temperatureData.change_ch4,
            change_n20: continentYear.temperatureData.change_n20,
            shares: continentYear.temperatureData.shares,
            year: continentYear.year,
          },
        },
      });
    } else {
      setTempCountryYear({
        isInit: tempcountryYear.isInit,
        data: {
          year: tempcountryYear.data.year,
          generalData: tempcountryYear.data.generalData,
          emissionData: tempcountryYear.data.emissionData,
          energyData: tempcountryYear.data.energyData,
          temperatureData: {
            change_ghg: tempcountryYear.data.temperatureData.change_ghg,
            change_co2: event.target.value,
            change_ch4: tempcountryYear.data.temperatureData.change_ch4,
            change_n20: tempcountryYear.data.temperatureData.change_n20,
            shares: tempcountryYear.data.temperatureData.shares,
            year: tempcountryYear.data.year,
          },
        },
      });
    }
  }

  function handleChangeCH4(event) {
    if (!tempcountryYear.isInit) {
      setTempCountryYear({
        isInit: true,
        data: {
          year: continentYear.year,
          generalData: continentYear.generalData,
          emissionData: continentYear.emissionData,
          energyData: continentYear.energyData,
          temperatureData: {
            change_ghg: continentYear.temperatureData.change_ghg,
            change_co2: continentYear.temperatureData.change_co2,
            change_ch4: event.target.value,
            change_n20: continentYear.temperatureData.change_n20,
            shares: continentYear.temperatureData.shares,
            year: continentYear.year,
          },
        },
      });
    } else {
      setTempCountryYear({
        isInit: tempcountryYear.isInit,
        data: {
          year: tempcountryYear.data.year,
          generalData: tempcountryYear.data.generalData,
          emissionData: tempcountryYear.data.emissionData,
          energyData: tempcountryYear.data.energyData,
          temperatureData: {
            change_ghg: tempcountryYear.data.temperatureData.change_ghg,
            change_co2: tempcountryYear.data.temperatureData.change_co2,
            change_ch4: event.target.value,
            change_n20: tempcountryYear.data.temperatureData.change_n20,
            shares: tempcountryYear.data.temperatureData.shares,
            year: tempcountryYear.data.year,
          },
        },
      });
    }
  }

  function handleChangeN20(event) {
    if (!tempcountryYear.isInit) {
      setTempCountryYear({
        isInit: true,
        data: {
          year: continentYear.year,
          generalData: continentYear.generalData,
          emissionData: continentYear.emissionData,
          energyData: continentYear.energyData,
          temperatureData: {
            change_ghg: continentYear.temperatureData.change_ghg,
            change_co2: continentYear.temperatureData.change_co2,
            change_ch4: continentYear.temperatureData.change_ch4,
            change_n20: event.target.value,
            shares: continentYear.temperatureData.shares,
            year: continentYear.year,
          },
        },
      });
    } else {
      setTempCountryYear({
        isInit: tempcountryYear.isInit,
        data: {
          year: tempcountryYear.data.year,
          generalData: tempcountryYear.data.generalData,
          emissionData: tempcountryYear.data.emissionData,
          energyData: tempcountryYear.data.energyData,
          temperatureData: {
            change_ghg: tempcountryYear.data.temperatureData.change_ghg,
            change_co2: tempcountryYear.data.temperatureData.change_co2,
            change_ch4: tempcountryYear.data.temperatureData.change_ch4,
            change_n20: event.target.value,
            shares: tempcountryYear.data.temperatureData.shares,
            year: tempcountryYear.data.year,
          },
        },
      });
    }
  }

  function handleShares(event) {
    if (!tempcountryYear.isInit) {
      setTempCountryYear({
        isInit: true,
        data: {
          year: continentYear.year,
          generalData: continentYear.generalData,
          emissionData: continentYear.emissionData,
          energyData: continentYear.energyData,
          temperatureData: {
            change_ghg: continentYear.temperatureData.change_ghg,
            change_co2: continentYear.temperatureData.change_co2,
            change_ch4: continentYear.temperatureData.change_ch4,
            change_n20: continentYear.temperatureData.change_n20,
            shares: event.target.value,
            year: continentYear.year,
          },
        },
      });
    } else {
      setTempCountryYear({
        isInit: tempcountryYear.isInit,
        data: {
          year: tempcountryYear.data.year,
          generalData: tempcountryYear.data.generalData,
          emissionData: tempcountryYear.data.emissionData,
          energyData: tempcountryYear.data.energyData,
          temperatureData: {
            change_ghg: tempcountryYear.data.temperatureData.change_ghg,
            change_co2: tempcountryYear.data.temperatureData.change_co2,
            change_ch4: tempcountryYear.data.temperatureData.change_ch4,
            change_n20: tempcountryYear.data.temperatureData.change_n20,
            shares: event.target.value,
            year: tempcountryYear.data.year,
          },
        },
      });
    }
  }

  function handlePut() {
    if (!tempcountryYear.isInit) {
      alert("Please enter data before submitting");
    } else {
      ContinentsNameYearService.putContinentsNameYear(
        params,
        tempcountryYear.data,
      );
    }
  }

  function handleData() {
    return (
      <div>
        <h1>{nameString}</h1>
        {continentYear.year && <h1>Year: {continentYear.year}</h1>}

        <div className="FORM">
        <a style={{ fontWeight: "bold" }}>Choose data type</a>
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
            <input type="submit" value="Submit" />
          </form>
        </div>

        <div className="FORM">
          <a style={{ fontWeight: "bold" }}>MODIFY DATA</a>

          <form>
            <label>
              Population of modified data:
              <input
                type="text"
                placeholder="Enter population"
                onChange={handlePopulation}
              ></input>
            </label>
            <label>
              GDP of modified data:
              <input
                type="text"
                placeholder="Enter gdp"
                onChange={handleGDP}
              ></input>
            </label>
            <label>
              CO2 of modified data:
              <input
                type="text"
                placeholder="Enter CO2"
                onChange={handleCO2}
              ></input>
            </label>
            <label>
              CH4 of modified data:
              <input
                type="text"
                placeholder="Enter CH4"
                onChange={handleCH4}
              ></input>
            </label>
            <label>
              N20 of modified data:
              <input
                type="text"
                placeholder="Enter N20"
                onChange={handleN20}
              ></input>
            </label>
            <label>
              Total ghg of modified data:
              <input
                type="text"
                placeholder="Enter total ghg"
                onChange={handleGHG}
              ></input>
            </label>
            <label>
              Energy per cap of modified data:
              <input
                type="text"
                placeholder="Enter energy per cap"
                onChange={handleEnergyPerCap}
              ></input>
            </label>
            <label>
              Energy per ghg of modified data:
              <input
                type="text"
                placeholder="Enter energy per ghg"
                onChange={handleEnergyPerGHG}
              ></input>
            </label>
            <label>
              Change ghg of modified data:
              <input
                type="text"
                placeholder="Enter change ghg"
                onChange={handleChangeGHG}
              ></input>
            </label>
            <label>
              Change co2 of modified data:
              <input
                type="text"
                placeholder="Enter change co2"
                onChange={handleChangeCO2}
              ></input>
            </label>
            <label>
              Change ch4 of modified data:
              <input
                type="text"
                placeholder="Enter change ch4"
                onChange={handleChangeCH4}
              ></input>
            </label>
            <label>
              Change n20 of modified data:
              <input
                type="text"
                placeholder="Enter change n20"
                onChange={handleChangeN20}
              ></input>
            </label>
            <label>
              Shares of modified data:
              <input
                type="text"
                placeholder="Enter shares"
                onChange={handleShares}
              ></input>
            </label>
            <select onChange={handlePut} value="Not Submitting">
              <option>Not Submitting</option>
              <option>Submitting</option>
            </select>
          </form>
        </div>

        <button className="Layout-button" onClick={deleteEntry}>
          Delete Entry
        </button>

        {handleDataTypes()}
      </div>
    );
  }

  function handleOutput() {
    if (hasError == 1) {
      return handleError();
    } else {
      return handleData();
    }
  }

  return handleOutput();
}

export default ContinentsYear;
