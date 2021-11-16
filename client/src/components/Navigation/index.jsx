import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Link to="/">Navbar</Link>
        <Nav className="me-auto">
          <Link className="nav-link" to="/">
            Inicio
          </Link>
          <Link className="nav-link" to="/about">
            Acerca de
          </Link>
          <Link className="nav-link" to="/contact">
            Contacto
          </Link>
          <Link className="nav-link" to="/users">
            Usuarios
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
