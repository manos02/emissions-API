import React from "react";
import { useParams } from 'react-router-dom';
import CountriesISOService from "../../services/CountriesISOService";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}


class CountriesISO extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      country: {
        iso : "iso",
        name : "name",
        data: []
      },
      emission: {
        co2: "co2",
        ch4: "ch4",
        n20: "n20",
        ghg: "ghg",
        year: 0
      }
    }
  }

  componentDidMount(){
    CountriesISOService.getCountriesISO(this.props.params).then((response) => {
      this.setState({country : response.data})
    })
  }

  render(){
    return (
    <div>
      <h1>Countries</h1>
      <h1>{this.state.country.iso}</h1>
      <h1>{this.state.country.name}</h1>
      
        
          {
            this.state.country.data.map(
              temp => (
              <p key = {temp.year}>
                <a>{temp.year}</a>
                <a>{temp.emission.ch4}</a>
              </p>
              )
            )
          }


    </div>
    )
  }

}




export default withParams(CountriesISO);