import React from "react";
import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from "react-bootstrap";

const navbar = ({user, logout}) => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#brand">Boxinity</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="#" onClick={logout}>
            {
              user && "Logout"
            }
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default navbar;
