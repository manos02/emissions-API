import React from "react";
import ContinentsService from "../../services/ContinentsService";

class Continents extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      continents: []
    }
  }

  componentDidMount(){
    ContinentsService.getContinents().then((response) => {
      this.setState({continents : response.data})
    })
  }

  render(){
    return (
    <div>
      <h1>Continents</h1>
      <table border="1px solid">
        <thead>
          <tr>
            <td>Continent Name</td>
          </tr>
        </thead>
        <tbody>
          {
            this.state.continents.map(
              continent => (
              <tr key = {continent}>
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

}




export default Continents;