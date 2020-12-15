import React from "react";
import { MnavbarProps } from "../interfaces";
import PropTypes from "prop-types";
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from "react-bootstrap";

/**
 * Mnavbar component
 */
export const Mnavbar: React.FC<MnavbarProps> = (props) => {
  return (
    <>
      <Navbar style={{ backgroundColor: "aquamarine !important" }} collapseOnSelect expand="lg" bg={props.theme} variant={props.theme}>
        <Navbar.Brand href="/">S&P 500 Stock Analysis</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="/about">About</Nav.Link> */}
          </Nav>
          <NavDropdown.Divider />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

Mnavbar.propTypes = {
  theme: PropTypes.any.isRequired,
};
