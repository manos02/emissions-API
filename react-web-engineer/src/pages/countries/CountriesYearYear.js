import React from "react";
import { useParams } from 'react-router-dom';
import CountriesISOYYService from "../../services/CountriesISOYYService";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class CountriesYY extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesYY : []
    }
  }

   componentDidMount() {
     const { params } = this.props;
     console.log(params);
     CountriesISOYYService.getCountries(params)
       .then((response) => {
         this.setState({ countriesYY: response.data });
       })
       .catch((error) => {
         console.error("Error fetching countries:", error);
       });
   }


    render() {
      return (
        <div>
          <h1>{this.state.countriesYY.name}</h1>
        </div>
      );
    }
}

export default withParams(CountriesYY);
