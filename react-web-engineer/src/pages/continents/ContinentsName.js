import React, {useState} from "react";
import { useParams, useLocation } from 'react-router-dom';
import ContinentsNameService from "../../services/ContinentsNameService";
import { useNavigate } from "react-router-dom";
import ".././Layout.css";

function ContinentsName(){
  const [continent, setContinent] = useState({
    name: "name",
    data: [],
  },
);
const [dataTypeForm, setDataTypeForm] = useState(4);
  const params = useParams()
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [year, setYear] = useState(null);

  const goRouteNameYear = (name, year) => {
    navigate(`/continents/${name}/${year}`);
  };


  const componentDidMount= async() => {
    try {
      const response = await ContinentsNameService.getContinentsName(params, queryParams);
      const {name, data } = response.data;
      setContinent({
          name: name,
          data: data,
        },
      );

    } catch (error) {
      console.error("Error fetching data:", error.message);
      if(error.message==="Request failed with status code 404"){
        alert(`${error.message}. Please go to a proper continent name :)`)
      } else if (error.message==="Request failed with status code 400"){
        alert(`${error.message}. Please enter proper query parameters :)`)
      } else{
        alert(`${error.message}. Please fix before proceeding.`)
      }
    }
  }

  componentDidMount();

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

  function handleYear(event){
    setYear(event.target.value)
  }

  async function handlePost(event){
    if(year!==null&&year!==undefined&&year!==""&&year>=0){
      try{
      const response = await ContinentsNameService.postContinentsName(params, year);
      setYear(null);
      } catch(error){
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
    return (<div className="ISO-data-items">
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
</div>)
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
    return (<div className="ISO-data-items">
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





  return (
    <div>
      <h1>{continent.name}</h1>
      <div className="FORM">
        <a>FILTER THE DATA</a>
      <form>
        <label>
          Datatype returned:
          <select onChange={handleDataTypeForm}>
            <option value="4">FullData</option>
            <option value="0">General Data</option>
            <option value="1">Emission data</option>
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
        <select onChange={handlePost} value="Not Submitting">
            <option>Not Submitting</option>
            <option>Submitting</option>
          </select>
      </form>
      </div>
      
      
  {continent.data.map((item, index) => (
    <div key={index} className="ISO">

        <a className = 'Layout-button' onClick={()=> goRouteNameYear(continent.name, item.year)}>Year: {item.year}</a>

        <div className="ISO-data">
      
        {handleOptions(item)}



</div>
<a>--------------</a>
    </div>
  ))}
  
</div>
);
}

export default ContinentsName;