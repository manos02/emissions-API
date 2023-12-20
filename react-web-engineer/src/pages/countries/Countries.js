import React from "react";
import CountriesService from "../../services/CountriesService";

class Countries extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      countries: []
    }
  }

  componentDidMount(){
    CountriesService.getCountries().then((response) => {
      this.setState({countries : response.data})
    })
  }

  render(){
    return (
    <div>
      <h1>Countries</h1>
      <table border="1px solid">
        <thead>
          <tr>
            <td>Country ISO</td>
            <td>Country Name</td>
          </tr>
        </thead>
        <tbody>
          {
            this.state.countries.map(
              country => (
              <tr key = {country.iso}>
                <td>{country.iso}</td>
                <td>{country.name}</td>
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




export default Countries;