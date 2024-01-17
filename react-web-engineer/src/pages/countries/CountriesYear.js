import React, {useState} from "react";
import { useParams, useLocation } from 'react-router-dom';
import CountriesISOYService from "../../services/CountriesISOYService";
import ".././Layout.css";

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
        if(error.message==="Request failed with status code 404"){
          setHasError(1);
        } else if (error.message==="Request failed with status code 400"){
          alert(`${error.message}. Please enter proper query parameters :)`)
        } else{
          alert(`${error.message}. Please fix before proceeding.`)
        }
        
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

    const[tempcountryYear, setTempCountryYear] = useState({isInit: false, data:{
      year: countryYear.year,
      generalData: countryYear.generalData,
      emissionData: countryYear.emissionData,
      energyData: countryYear.energyData,
      temperatureData: countryYear.temperatureData,
    }}); 

    var isoString = params["iso"];
    var yearString = params["year"];

    function handleError(){
      return (<div>
        <a> No entry for {isoString} with year {yearString} :(</a>
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
          <p>Energy_per_ghg: {countryYear.energyData.energy_per_ghg}</p>
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
      if(!tempcountryYear.isInit){
        setTempCountryYear({isInit: true, data: {
          year: countryYear.year,
          generalData: {
            gdp: event.target.value,
            population: countryYear.generalData.population,
            year: countryYear.generalData.year
          },
          emissionData: countryYear.emissionData,
          energyData: countryYear.energyData,
          temperatureData: countryYear.temperatureData,
        }})
      } else{
      setTempCountryYear({isInit: tempcountryYear.isInit, data:{
        year: tempcountryYear.data.year,
        generalData: {
          gdp: event.target.value,
          population: tempcountryYear.data.generalData.population,
          year: tempcountryYear.data.generalData.year
        },
        emissionData: tempcountryYear.data.emissionData,
        energyData: tempcountryYear.data.energyData,
        temperatureData: tempcountryYear.data.temperatureData,
      }})
    }
    }

    function handlePopulation(event){
      if(!tempcountryYear.isInit){
        setTempCountryYear({isInit: true, data: {
          year: countryYear.year,
          generalData: {
            gdp: countryYear.generalData.gdp,
            population:event.target.value, 
            year: countryYear.generalData.year
          },
          emissionData: countryYear.emissionData,
          energyData: countryYear.energyData,
          temperatureData: countryYear.temperatureData,
        }})
      } else{
      setTempCountryYear({isInit: tempcountryYear.isInit, data:{
        year: tempcountryYear.data.year,
        generalData: {
          gdp: tempcountryYear.data.generalData.gdp,
          population:event.target.value, 
          year: tempcountryYear.data.generalData.year
        },
        emissionData: tempcountryYear.data.emissionData,
        energyData: tempcountryYear.data.energyData,
        temperatureData: tempcountryYear.data.temperatureData,
      }})
    }
    }

    function handleCO2(event){
      if(!tempcountryYear.isInit){
        setTempCountryYear({isInit: true, data: {
          year: countryYear.year,
          generalData: countryYear.generalData,
          emissionData: {
            co2: event.target.value,
            ch4: countryYear.emissionData.ch4,
            n20: countryYear.emissionData.n20,
            ghg: countryYear.emissionData.ghg,
            year: countryYear.emissionData.year
          },
          energyData: countryYear.energyData,
          temperatureData: countryYear.temperatureData,
        }})
      } else{
      setTempCountryYear({isInit: tempcountryYear.isInit, data:{
        year: tempcountryYear.data.year,
        generalData: tempcountryYear.data.generalData,
        emissionData: {
          co2: event.target.value,
          ch4: tempcountryYear.data.emissionData.ch4,
          n20: tempcountryYear.data.emissionData.n20,
          ghg: tempcountryYear.data.emissionData.ghg,
          year: tempcountryYear.data.emissionData.year
        },
        energyData: tempcountryYear.data.energyData,
        temperatureData: tempcountryYear.data.temperatureData,
      }})
    }
    }

    function handleCH4(event){
      if(!tempcountryYear.isInit){
        setTempCountryYear({isInit: true, data: {
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
        }})
      } else{
      setTempCountryYear({isInit: tempcountryYear.isInit, data:{
        year: tempcountryYear.data.year,
        generalData: tempcountryYear.data.generalData,
        emissionData: {
          co2: tempcountryYear.data.emissionData.co2,
          ch4: event.target.value,
          n20: tempcountryYear.data.emissionData.n20,
          ghg: tempcountryYear.data.emissionData.ghg,
          year: tempcountryYear.data.emissionData.year
        },
        energyData: tempcountryYear.data.energyData,
        temperatureData: tempcountryYear.data.temperatureData,
      }})
    }
    }

    function handleN20(event){
      if(!tempcountryYear.isInit){
        setTempCountryYear({isInit: true, data: {
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
        }})
      } else{
      setTempCountryYear({isInit: tempcountryYear.isInit, data:{
        year: tempcountryYear.data.year,
        generalData: tempcountryYear.data.generalData,
        emissionData: {
          co2: tempcountryYear.data.emissionData.co2,
          ch4: tempcountryYear.data.emissionData.ch4,
          n20: event.target.value,
          ghg: tempcountryYear.data.emissionData.ghg,
          year: tempcountryYear.data.emissionData.year
        },
        energyData: tempcountryYear.data.energyData,
        temperatureData: tempcountryYear.data.temperatureData,
      }})
    }
    }

    function handleGHG(event){
      if(!tempcountryYear.isInit){
        setTempCountryYear({isInit: true, data: {
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
        }})
      } else{
      setTempCountryYear({isInit: tempcountryYear.isInit, data:{
        year: tempcountryYear.data.year,
        generalData: tempcountryYear.data.generalData,
        emissionData: {
          co2: tempcountryYear.data.emissionData.co2,
          ch4: tempcountryYear.data.emissionData.ch4,
          n20: tempcountryYear.data.emissionData.n20,
          ghg: event.target.value,
          year: tempcountryYear.data.emissionData.year
        },
        energyData: tempcountryYear.data.energyData,
        temperatureData: tempcountryYear.data.temperatureData,
      }})
    }
    }

    function handleEnergyPerCap(event){
      if(!tempcountryYear.isInit){
        setTempCountryYear({isInit: true, data: {
          year: countryYear.year,
          generalData: countryYear.generalData,
          emissionData: countryYear.emissionData,
          energyData: {
            energy_per_cap: event.target.value,
            energy_per_ghg: countryYear.energyData.energy_per_ghg,
            year: countryYear.year
          },
          temperatureData: countryYear.temperatureData,
        }})
      } else{
      setTempCountryYear({isInit: tempcountryYear.isInit, data:{
        year: tempcountryYear.data.year,
        generalData: tempcountryYear.data.generalData,
        emissionData: tempcountryYear.data.emissionData,
        energyData: {
          energy_per_cap: event.target.value,
          energy_per_ghg: tempcountryYear.data.energyData.energy_per_ghg,
          year: tempcountryYear.data.year
        },
        temperatureData: tempcountryYear.data.temperatureData,
      }})
    }
    console.log(tempcountryYear.data.energyData.energy_per_ghg)
    console.log(tempcountryYear.data.energyData)

    }

    function handleEnergyPerGHG(event){
      if(!tempcountryYear.isInit){
        setTempCountryYear({isInit: true, data: {
          year: countryYear.year,
          generalData: countryYear.generalData,
          emissionData: countryYear.emissionData,
          energyData: {
            energy_per_cap: countryYear.energyData.energy_per_cap,
            energy_per_ghg: event.target.value,
            year: countryYear.year
          },
          temperatureData: countryYear.temperatureData,
        }})
      } else{
      setTempCountryYear({isInit: tempcountryYear.isInit, data:{
        year: tempcountryYear.data.year,
        generalData: tempcountryYear.data.generalData,
        emissionData: tempcountryYear.data.emissionData,
        energyData: {
          energy_per_cap: tempcountryYear.data.energyData.energy_per_cap,
          energy_per_ghg: event.target.value,
          year: tempcountryYear.data.year
        },
        temperatureData: tempcountryYear.data.temperatureData,
      }})
    }
    }

    function handleChangeGHG(event){
      if(!tempcountryYear.isInit){
        setTempCountryYear({isInit: true, data: {
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
        }})
      } else{
      setTempCountryYear({isInit: tempcountryYear.isInit, data:{
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
          year: tempcountryYear.data.year
        },
      }})
    }
    }

    function handleChangeCO2(event){
      if(!tempcountryYear.isInit){
        setTempCountryYear({isInit: true, data: {
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
        }})
      } else{
      setTempCountryYear({isInit: tempcountryYear.isInit, data:{
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
          year: tempcountryYear.data.year
        },
      }})
    }
    }

    function handleChangeCH4(event){
      if(!tempcountryYear.isInit){
      setTempCountryYear({isInit: true, data: {
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
      }})
    } else{
    setTempCountryYear({isInit: tempcountryYear.isInit, data:{
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
        year: tempcountryYear.data.year
      },
    }})
  }
    }

    function handleChangeN20(event){
      if(!tempcountryYear.isInit){
        setTempCountryYear({isInit: true, data: {
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
        }})
      } else{
      setTempCountryYear({isInit: tempcountryYear.isInit, data:{
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
          year: tempcountryYear.data.year
        },
      }})
    }
    }

    function handleShares(event){
      if(!tempcountryYear.isInit){
        setTempCountryYear({isInit: true, data: {
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
        }})
      } else{
      setTempCountryYear({isInit: tempcountryYear.isInit, data:{
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
          year: tempcountryYear.data.year
        },
      }})
    }
    }

    function handlePut(){
      if(!tempcountryYear.isInit){
        alert("Please enter data before submitting")
      } else{
        CountriesISOYService.putCountriesISOYear(params, tempcountryYear.data);
      }
    }



    function handleData(){
    return (
      <div>
        <h2>{isoString}</h2>
        {countryYear.year && <h2>Year: {countryYear.year}</h2>}

        <div className="FORM">
          <a>Choose what information you want to see. </a>
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
      </div>

      <div className="FORM">
      <a>MODIFY DATA</a>


        <form>
        <label>
          Population of modified data:
          <input type="text" placeholder="Enter population" onChange={handlePopulation}></input>
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
        <select onChange={handlePut} value="Not Submitting">
            <option>Not Submitting</option>
            <option>Submitting</option>
          </select>
      </form>
      </div>

      <button className="Layout-button" onClick={deleteEntry}>Delete Entry</button>

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
