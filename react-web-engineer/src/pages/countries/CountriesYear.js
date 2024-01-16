import React, {useState} from "react";
import { useParams, useLocation } from 'react-router-dom';
import CountriesISOYService from "../../services/CountriesISOYService";

function CountriesYear() {
    const[countryYear, setCountryYear] = useState({
        year: 0,
        generalData: {
          gdp: 0,
          population: 0,
          year: 0
        },
        emissionData: {
          co2: 0,
          ch4: 0,
          n20: 0,
          ghg: 0,
          year: 0
        },
        energyData: {
          energy_per_cap: 0,
          energy_per_ghg: 0,
          year: 0
        },
        temperatureData: {
          change_ghg: 0,
          change_co2: 0,
          change_ch4: 0,
          change_n20: 0,
          shares: 0,
          year: 0
        },
      }
    )

    

    const params = useParams();
    const [hasError, setHasError] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  var formData = queryParams.get("dataType");
  

  const componentDidMount = async() => {
      try {
        const response = await CountriesISOYService.getCountriesISOYear(params);
        setCountryYear({
            year: response.data.year,
            generalData: response.data.generalData,
            emissionData: response.data.emissionData,
            energyData: response.data.energyData,
            temperatureData: response.data.temperatureData,
          },
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setHasError(1);
      }
    }

    function deleteEntry(){
      CountriesISOYService.deleteCountriesISOYear(params).then(response => {
        console.log(`Deleted post`);
      })
      .catch(error => {
        console.error(error);
      });
    }

    componentDidMount();

    const[tempcountryYear, setTempCountryYear] = useState({
      year: countryYear.year,
      generalData: countryYear.generalData,
      emissionData: countryYear.emissionData,
      energyData: countryYear.energyData,
      temperatureData: countryYear.temperatureData,
    }); 

    var isoString = params["iso"];
    var yearString = params["year"];

    function handleError(){
      return (<div>
        <h> No entry for {isoString} with year {yearString} :(</h>
      </div>);
    }

    function handleGeneralData(){
      return (<div><h2>General Data:</h2>
      {countryYear.generalData && (
        <>
          <p>GDP: {countryYear.generalData.gdp}</p>
          <p>Population: {countryYear.generalData.population}</p>
        </>
      )}</div>)
    }

    function handleEmissionData(){
      return (<div><h2>Emission Data:</h2>
      {countryYear.emissionData && (
        <>
          <p>CO2: {countryYear.emissionData.co2}</p>
          <p>CH4: {countryYear.emissionData.ch4}</p>
          <p>N20: {countryYear.emissionData.n20}</p>
          <p>Total ghg: {countryYear.emissionData.ghg}</p>
        </>
      )}</div>)
    }

    function handleEnergyData(){
      return(<div><h2>Energy Data:</h2>
      {countryYear.energyData && (
        <>
          <p>Energy_per_cap: {countryYear.energyData.energy_per_cap}</p>
          <p>Energy_per_ghg: {countryYear.emissionData.energy_per_ghg}</p>
        </>
      )}</div>)
    }

    function handleTemperatureData(){
      return (<div><h2>Temperature Data:</h2>
      {countryYear.temperatureData && (
        <>
          <p>Change ghg: {countryYear.temperatureData.change_ghg}</p>
          <p>Change co2: {countryYear.temperatureData.change_co2}</p>
          <p>Change ch4: {countryYear.temperatureData.change_ch4}</p>
          <p>Change n20: {countryYear.temperatureData.change_n20}</p>
          <p>Shares: {countryYear.temperatureData.shares}</p>
        </>
      )}</div>)
    }

    function handleDataTypes(){

      if(formData==0){
         return handleGeneralData()
      } else
      if(formData==1){
         return handleEmissionData()
      } else
      if(formData==2){
        return handleEnergyData()
      } else
      if(formData==3){
        return handleTemperatureData()
      } else {
        return (<div>
          
        {handleGeneralData()}

        {handleEmissionData()}

        {handleEnergyData()}

        {handleTemperatureData()}
        </div>)
      }
    }

    function handleGDP(event){
      setTempCountryYear({
        year: tempcountryYear.year,
        generalData: {
          gdp: event.target.value,
          population: tempcountryYear.generalData.population,
        },
        emissionData: tempcountryYear.emissionData,
        energyData: tempcountryYear.energyData,
        temperatureData: tempcountryYear.temperatureData,
      })
    }

    function handlePopulation(event){
      setCountryYear({
        year: tempcountryYear.year,
        generalData: {
          gdp: tempcountryYear.generalData.gdp,
          population: event.target.value,
          year: tempcountryYear.emissionData.year
        },
        emissionData: tempcountryYear.emissionData,
        energyData: tempcountryYear.energyData,
        temperatureData: tempcountryYear.temperatureData,
      })
    }

    function handleCO2(event){
      setCountryYear({
        year: tempcountryYear.year,
        generalData: tempcountryYear.generalData,
        emissionData: {
          co2: event.target.value,
          ch4: tempcountryYear.emissionData.ch4,
          n20: tempcountryYear.emissionData.n20,
          ghg: tempcountryYear.emissionData.ghg,
          year: tempcountryYear.emissionData.year
        },
        energyData: countryYear.energyData,
        temperatureData: countryYear.temperatureData,
      })
    }

    function handleCH4(event){
      setCountryYear({
        year: countryYear.year,
        generalData: countryYear.generalData,
        emissionData: {
          co2: countryYear.emissionData.co2,
          ch4: event.target.value,
          n20: countryYear.emissionData.n20,
          ghg: countryYear.emissionData.ghg,
          year: countryYear.emissionData.year
        },
        energyData: countryYear.energyData,
        temperatureData: countryYear.temperatureData,
      })
    }

    function handleN20(event){
      setCountryYear({
        year: countryYear.year,
        generalData: countryYear.generalData,
        emissionData: {
          co2: countryYear.emissionData.co2,
          ch4: countryYear.emissionData.ch4,
          n20: event.target.value,
          ghg: countryYear.emissionData.ghg,
          year: countryYear.emissionData.year
        },
        energyData: countryYear.energyData,
        temperatureData: countryYear.temperatureData,
      })
    }

    function handleGHG(event){
      setCountryYear({
        year: countryYear.year,
        generalData: countryYear.generalData,
        emissionData: {
          co2: countryYear.emissionData.co2,
          ch4: countryYear.emissionData.ch4,
          n20: countryYear.emissionData.n20,
          ghg: event.target.value,
          year: countryYear.emissionData.year
        },
        energyData: countryYear.energyData,
        temperatureData: countryYear.temperatureData,
      })
    }

    function handleEnergyPerCap(event){
      setCountryYear({
        year: countryYear.year,
        generalData: countryYear.generalData,
        emissionData: countryYear.emissionData,
        energyData: {
          energy_per_cap: event.target.value,
          energy_per_ghg: countryYear.energyData.energy_per_ghg,
          year: countryYear.year
        },
        temperatureData: countryYear.temperatureData,
      })
    }

    function handleEnergyPerGHG(event){
      setCountryYear({
        year: countryYear.year,
        generalData: countryYear.generalData,
        emissionData: countryYear.emissionData,
        energyData: {
          energy_per_cap: countryYear.energyData.energy_per_cap,
          energy_per_ghg: event.target.value,
          year: countryYear.year
        },
        temperatureData: countryYear.temperatureData,
      })
    }

    function handleChangeGHG(event){
      setCountryYear({
        year: countryYear.year,
        generalData: countryYear.generalData,
        emissionData: countryYear.emissionData,
        energyData: countryYear.energyData,
        temperatureData: {
          change_ghg: event.target.value,
          change_co2: countryYear.temperatureData.change_co2,
          change_ch4: countryYear.temperatureData.change_ch4,
          change_n20: countryYear.temperatureData.change_n20,
          shares: countryYear.temperatureData.shares,
          year: countryYear.year
        },
      })
    }

    function handleChangeCO2(event){
      setCountryYear({
        year: countryYear.year,
        generalData: countryYear.generalData,
        emissionData: countryYear.emissionData,
        energyData: countryYear.energyData,
        temperatureData: {
          change_ghg: countryYear.temperatureData.change_ghg,
          change_co2: event.target.value,
          change_ch4: countryYear.temperatureData.change_ch4,
          change_n20: countryYear.temperatureData.change_n20,
          shares: countryYear.temperatureData.shares,
          year: countryYear.year
        },
      })
    }

    function handleChangeCH4(event){
      setCountryYear({
        year: countryYear.year,
        generalData: countryYear.generalData,
        emissionData: countryYear.emissionData,
        energyData: countryYear.energyData,
        temperatureData: {
          change_ghg: countryYear.temperatureData.change_ghg,
          change_co2: countryYear.temperatureData.change_co2,
          change_ch4: event.target.value,
          change_n20: countryYear.temperatureData.change_n20,
          shares: countryYear.temperatureData.shares,
          year: countryYear.year
        },
      })
    }

    function handleChangeN20(event){
      setCountryYear({
        year: countryYear.year,
        generalData: countryYear.generalData,
        emissionData: countryYear.emissionData,
        energyData: countryYear.energyData,
        temperatureData: {
          change_ghg: countryYear.temperatureData.change_ghg,
          change_co2: countryYear.temperatureData.change_co2,
          change_ch4: countryYear.temperatureData.change_ch4,
          change_n20: event.target.value,
          shares: countryYear.temperatureData.shares,
          year: countryYear.year
        },
      })
    }

    function handleShares(event){
      setCountryYear({
        year: countryYear.year,
        generalData: countryYear.generalData,
        emissionData: countryYear.emissionData,
        energyData: countryYear.energyData,
        temperatureData: {
          change_ghg: countryYear.temperatureData.change_ghg,
          change_co2: countryYear.temperatureData.change_co2,
          change_ch4: countryYear.temperatureData.change_ch4,
          change_n20: countryYear.temperatureData.change_n20,
          shares: event.target.value,
          year: countryYear.year
        },
      })
    }

    function handlePut(){
      alert("tried");
      CountriesISOYService.putCountriesISOYear(params, tempcountryYear);
    }



    function handleData(){
    return (
      <div>

        <button onClick={deleteEntry}>Delete Entry</button>

      <form>
        <label>
          Datatype returned:
          <select name="dataType">
            <option value="4">FullData</option>
            <option value="0">General data</option>
            <option value="1">Emission Data</option>
            <option value="2">Energy Data</option>
            <option value="3">Temperature Data</option>
          </select>
        </label>
        <input type="submit" value="Submit"/>
      </form>


        <form>
        <label>
          Population of modified data:
          <input type="text" placeholder="Enter population" onChange={handlePopulation} value={countryYear.generalData.population}></input>
        </label>
        <label>
          GDP of modified data:
          <input type="text" placeholder="Enter gdp" onChange={handleGDP}></input>
        </label>
        <label>
          CO2 of modified data:
          <input type="text" placeholder="Enter CO2" onChange={handleCO2}></input>
        </label>
        <label>
          CH4 of modified data:
          <input type="text" placeholder="Enter CH4" onChange={handleCH4}></input>
        </label>
        <label>
          N20 of modified data:
          <input type="text" placeholder="Enter N20" onChange={handleN20}></input>
        </label>
        <label>
          Total ghg of modified data:
          <input type="text" placeholder="Enter total ghg" onChange={handleGHG}></input>
        </label>
        <label>
          Energy per cap of modified data:
          <input type="text" placeholder="Enter energy per cap" onChange={handleEnergyPerCap}></input>
        </label>
        <label>
          Energy per ghg of modified data:
          <input type="text" placeholder="Enter energy per ghg" onChange={handleEnergyPerGHG}></input>
        </label>
        <label>
          Change ghg of modified data:
          <input type="text" placeholder="Enter change ghg" onChange={handleChangeGHG}></input>
        </label>
        <label>
          Change  co2 of modified data:
          <input type="text" placeholder="Enter change co2" onChange={handleChangeCO2}></input>
        </label>
        <label>
          Change ch4 of modified data:
          <input type="text" placeholder="Enter change ch4" onChange={handleChangeCH4}></input>
        </label>
        <label>
          Change n20 of modified data:
          <input type="text" placeholder="Enter change n20" onChange={handleChangeN20}></input>
        </label>
        <label>
          Shares of modified data:
          <input type="text" placeholder="Enter shares" onChange={handleShares}></input>
        </label>
        <select onChange={handlePut}>
            <option>Not Submitting</option>
            <option>Submitting</option>
          </select>
      </form>


        <h2>{isoString}</h2>
        {countryYear.year && <h2>Year: {countryYear.year}</h2>}
        {handleDataTypes()}
      </div>
    );
        }

    function handleOutput(){
      if(hasError==1){
        return handleError();
      } else {
        return handleData();
      }
    }

    return(
      handleOutput()
    )
    
  }

  export default CountriesYear;
