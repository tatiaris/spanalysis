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
        <Navbar.Brand href="/">S&P 500 Market Analysis</Navbar.Brand>
      </Navbar>
    </>
  );
};

Mnavbar.propTypes = {
  theme: PropTypes.any.isRequired,
};
