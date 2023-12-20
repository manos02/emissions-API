import { Outlet, Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import "./Layout.css";

const Layout = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container className= 'Layout-nav'>
        <header className = 'Layout-header'> Temperature and Emissions Data! </header>
      <Nav className = 'Layout-nav-item'>
      <a className = 'Layout-nav-item' href="/">Home</a>
      <a className = 'Layout-nav-item' href="/countries">Countries</a>
      <a className = 'Layout-nav-item' href="/continents">Continents</a>
      </Nav>
      <button className = 'Layout-login'>Log in</button>
      </Container>
      <Outlet />
    </Navbar>
  )
};

export default Layout;