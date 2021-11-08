import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  FormGroup,
  Button,
  Image,
  Card,
  ToggleButton,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

import { login } from "../../actions/auth";
import LoginJpg from "../../assets/img/auth/login.jpg";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login(username, password))
      .then(() => {
        props.history.push("/");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(false);

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center d-flex vh-100">
        <Col md={6}>
          <Image src={LoginJpg} fluid />
        </Col>
        <Col md={6} className="p-0 px-xl-5">
          <Card body className="p-0 p-md-2 p-lg-4 m-0 mx-xl-5 border-0">
            <div className="mb-4 text-center">
              <h1 className="display-4 text-center mb-2">Iniciar sesión</h1>
              <p className="text-muted text-center mb-2">
                Ingresa tus credenciales para acceder a tu cuenta.
              </p>
            </div>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3" controlId="username">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FormGroup>
              <div className="mb-3">
                <Row>
                  <Col>
                    <Form.Label htmlFor="password">Contraseña</Form.Label>
                  </Col>
                  <Col className="col-auto">
                    <Link
                      to="/"
                      className="small text-muted text-decoration-none"
                    >
                      ¿Olvidó su contraseña?
                    </Link>
                  </Col>
                </Row>

                <InputGroup className="mb-3">
                  <FormControl
                    id="password"
                    placeholder="***********"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <ToggleButton
                    id="toggle-check"
                    type="checkbox"
                    variant="outline-secondary"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.currentTarget.checked)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </ToggleButton>
                </InputGroup>
              </div>
              <Form.Group className="mb-3" controlId="remember-me">
                <Form.Check
                  type="checkbox"
                  name="remember-me"
                  label="Recordar contraseña"
                />
              </Form.Group>

              {message && (
                <Alert variant="warning">
                  {message}
                </Alert>
              )}
              <div className="d-grid mb-3 text-center">
                {isLoading ? (
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Cargando...
                  </Button>
                ) : (
                  <Button variant="primary" type="submit">
                    Iniciar sesión
                  </Button>
                )}
              </div>
            </Form>
            <div className="text-center">
              <p className="text-muted mb-0">
                ¿Aún no tienes una cuenta?{" "}
                <Link to="/" className="text-decoration-none">
                  Regístrate aquí
                </Link>
              </p>
            </div>
            <div className="border-top mt-3 pt-3 d-grid gap-2">
              <p className="text-muted text-center">
                Todos los derechos reservados | 2021
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
