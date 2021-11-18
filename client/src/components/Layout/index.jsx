import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import Navigation from "../Navigation";

const Layout = () => {
  return (
    <>
      <Navigation />
      <Container className="my-3">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
