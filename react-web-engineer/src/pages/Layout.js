import { Outlet, Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React, {useState}from 'react';
import { useNavigate } from "react-router-dom";
import "./Layout.css";



const Layout = () => {

  const [formData, setFormData]= useState({dataType: "countries", year: -1})
  const navigate = useNavigate();

  function formSubmit(event){
    if(formData.year<0){
      navigate(`/${formData.dataType}`);
    } else{
      navigate(`/${formData.dataType}/year/${formData.year}`);
    }
    
    setFormData({dataType: "countries", year:-1})
  }

  function handleDataType(event){
    setFormData({dataType: event.target.value, year: formData.year})
  }
  function handleYear(event){
    setFormData({dataType: formData.dataType, year: event.target.value})
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container className= 'Layout-nav'>
        <header className = 'Layout-header'> Temperature and Emissions Data! </header>
      <Nav className = 'Layout-nav-item'>
      <a className = 'Layout-nav-item' href="/">Home</a>
      <a className = 'Layout-nav-item' href="/countries">Countries</a>
      <a className = 'Layout-nav-item' href="/continents">Continents</a>
      </Nav>
      <form onSubmit={formSubmit}>
        <label>
          Datatype returned:
          <select onChange={handleDataType}>
            <option value="countries">countries</option>
            <option value="continents">continents</option>
          </select>
        </label>
        <label>
          Enter a year for all data:
          <input type="text" placeholder="Enter year" onChange={handleYear} ></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
      
      </Container>
      <Outlet />
    </Navbar>
  )
};

export default Layout;