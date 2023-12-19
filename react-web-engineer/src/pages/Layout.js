import { Outlet, Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import styled from 'styled-components';
import "./Layout.css";

const Layout = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container className= 'Layout-nav'>
        <header className = 'Layout-header'> Temperature and Emissions Data! </header>
      <a className = 'Layout-nav-item' href="/">Home</a>
      <a className = 'Layout-nav-item' href="/countries">Countries</a>
      <a className = 'Layout-nav-item' href="/continents">Continents</a>
      <a className = 'Layout-login'>Log in</a>
      </Container>
      <Outlet />
    </Navbar>
  )
};

export default Layout;