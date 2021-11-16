import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import SHA512 from "crypto-js/sha512";

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

import LoginJpg from "../../assets/img/auth/login.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useState(localStorage.getItem("token") || null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const pass = SHA512(password).toString();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/auth/signin",
        {
          email: email,
          password: pass,
        }
      );
      setJwt(data.token);
      localStorage.setItem("token", data.token);
    } catch (err) {
      setError(err);
      console.log(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      {jwt && <Navigate to="/" replace={true} />}
      <Container>
        <Row className="justify-content-center align-items-center d-flex vh-100">
          <Col md={6}>
            <Image src={LoginJpg} fluid />
          </Col>
          <Col md={6} className="p-0 px-xl-5">
            {error && (
              <Alert variant="danger">
                {error.name}: {error.message}
              </Alert>
            )}
            <Card body className="p-0 p-md-2 p-lg-4 m-0 mx-xl-5 border-0">
              <div className="mb-4 text-center">
                <h1 className="display-4 text-center mb-2">Iniciar sesión</h1>
                <p className="text-muted text-center mb-2">
                  Ingresa tus credenciales para acceder a tu cuenta.
                </p>
              </div>
              <Form onSubmit={handleLogin}>
                <FormGroup className="mb-3" controlId="email">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                      />
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
    </>
  );
};

export default Login;
