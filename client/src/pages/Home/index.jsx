import { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Navigation from "../../components/Navigation";

const Home = () => {
  useEffect(() => {
    localStorage.removeItem("token");
  });

  const logout = () => {
    localStorage.removeItem("token");
  };
  return (
    <>
      <Navigation />
      <h1>Home</h1>
      <Container>
        <Button onClick={() => logout} variant="outline-success">
          Cerrar sesión
        </Button>
        <Link to="/login">Iniciar sesión</Link>
      </Container>
    </>
  );
};

export default Home;
