import React from "react";
import Nav from 'react-bootstrap/Nav'
import { Location, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
    const location: Location = useLocation();
    return (
        <nav className="navbar">
            <Nav defaultActiveKey="/" activeKey={location.pathname} className="flex-column">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/users">Your users</Nav.Link>
            </Nav>
        </nav>
    );
  }