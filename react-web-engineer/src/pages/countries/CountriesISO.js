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
  const [formData, setFormData] = useState({population: null, gdp: null, year:null})
  const [dataTypeForm, setDataTypeForm] = useState(4);
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
      console.error("Error fetching data:", error.message);
      if(error.message==="Request failed with status code 404"){
        alert(`${error.message}. Please go to a proper country ISO :)`)
      } else if (error.message==="Request failed with status code 400"){
        alert(`${error.message}. Please enter proper query parameters :)`)
      } else{
        alert(`${error.message}. Please fix before proceeding.`)
      }
    }
  }

  function handleYear(event){
    setFormData({population: formData.population, gdp: formData.gdp, year:event.target.value});
    console.log(formData);
  }
  function handlePopulation(event){
    setFormData({population: event.target.value, gdp: formData.gdp, year:formData.year});
  }
  function handleGDP(event){
    setFormData({population: formData.population, gdp: event.target.value, year:formData.year});
  }

  async function handlePost() {
    if(formData.year!==null&&formData.year!==undefined&&formData.year!==""&&formData.year>=0){
      try{
      const response = await CountriesISOService.postCountriesISO(params, formData);
      setFormData({population: null, gdp: null, year:null});
      }catch (error){
        
        if (error.message==="Request failed with status code 400"){
          alert(`${error.message}. Please enter proper query parameters :)`)
        } else{
          alert(`${error.message}. Please fix before proceeding.`)
        }
      }
    } else {
      alert("please enter valid year");
    }
  }

  function handleGeneralData(item){
    return (
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
    )
  }

  function handleEmissionData(item){
    return(<div className="ISO-data-items">
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
</div>)
  }

  function handleEnergyData(item){
    return(<div className="ISO-data-items">
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
</div>)
  }

  function handleTemperatureData(item){
    return (<div className="ISO-data-items">
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

  componentDidMount();

    return (
      <div>
        
        <h1>{country.iso}</h1>
        <h1>{country.name}</h1>

        <div className="FORM">
          <a>FILTER THE DATA</a>
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
      </div>

      <div className="FORM">
        <a>CREATE NEW DATA ENTRY</a>
      <form>
        <label>
          Year of new data:
          <input type="text" placeholder="Enter year" onChange={handleYear} required={true}></input>
        </label>
        <label>
          Population of new data:
          <input type="text" placeholder="Enter population" onChange={handlePopulation}></input>
        </label>
        <label>
          GDP of new data:
          <input type="text" placeholder="Enter gdp" onChange={handleGDP}></input>
        </label>
        <select onChange={handlePost} value="Not Submitting">
            <option>Not Submitting</option>
            <option>Submitting</option>
          </select>
      </form>
      </div>

        {country.data.map((item, index) => (
          <div key={index} className="ISO">
              <a className = 'Layout-button' onClick={()=> goRouteISOYear(country.iso, item.year)}>Year: {item.year}</a>
              <div className="ISO-data">
            {handleOptions(item)}
      
      </div>
      <a>--------------</a>
          </div>
        ))}
        
      </div>
    );
  }


export default CountriesISO;
