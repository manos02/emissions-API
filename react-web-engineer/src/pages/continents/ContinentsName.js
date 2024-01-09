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
  const params = useParams()
  const navigate = useNavigate();

  const goRouteNameYear = (name, year) => {
    navigate(`/countries/${name}/${year}`);
  };


  const componentDidMount= async() => {
    try {
      const response = await ContinentsNameService.getContinentsName(params);
      const {iso, name, data } = response.data;
      setContinent({
          name: name,
          data: data,
        },
      );

    } catch (error) {
      console.log(error);
    }
  }
}

export default ContinentsName;