import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Inicio
            </NavLink>
            <NavLink className="nav-link" to="about">
              Acerca de
            </NavLink>
            <NavLink className="nav-link" to="contact">
              Contacto
            </NavLink>
            <NavLink className="nav-link" to="users">
              Usuarios
            </NavLink>
          </Nav>
          <Button onClick={handleLogout} variant="success">
            <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
          </Button>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
