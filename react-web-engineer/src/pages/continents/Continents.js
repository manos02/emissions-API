import React, {useState} from "react";
import ContinentsService from "../../services/ContinentsService";
import { useNavigate } from "react-router-dom";

function onClickDesc(){
}

function Continents() {
      const [continents, setContinents] = useState([]);
      const navigate = useNavigate();

  const goRouteName = (name) => {
    navigate(`/continents/${name}`);
  };

  const componentDidMount= ()=>{
    ContinentsService.getContinents().then((response) => {
      setContinents(response.data)
    })
  }


  componentDidMount();

    return (
    <div>
      <div>
        <h1>Continents</h1>
        <button onClick={onClickDesc} >Descendng</button>
      </div>
      <table border="1px solid">
        <thead>
          <tr>
            <td>Continent Name</td>
          </tr>
        </thead>
        <tbody>
          {
            continents.map(
              continent => (
              <tr key = {continent} onClick={()=> goRouteName(continent)}>
                <td>{continent}</td>
              </tr>
              )
            )
          }
        </tbody>

      </table>

    </div>
    )
  

}




export default Continents;