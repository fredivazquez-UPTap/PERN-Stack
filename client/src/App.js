import "./App.css";

import ContactForm from "./components/contactForm/ContactForm";
import Home from "./components/home/home";
import About from "./components/about/About";
import Login from "./components/login/Login";

import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Link to="/">
            Navbar
          </Link>
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
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="my-3">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <ContactForm />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Container>
      <footer>
        <h1>Footer</h1>
      </footer>
    </Router>
  );
}

export default App;
