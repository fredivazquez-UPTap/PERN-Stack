import React, { useState } from "react";
import axios from "axios";
import md5 from "md5";
import LoginJpg from "../../assets/img/auth/login.jpg";
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
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 1000,
});

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitForm = (e) => {
    e.preventDefault();
    axiosInstance
      .post("auth/login", {
        username: username,
        password: md5(password),
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        if (response.data.is_found === true) {
          alert(`Bienvenido ${username}`);
        } else {
          alert("El usuario y/o la contraseña son incorrectos");
        }
      })
      .catch((error) => {
        if (error.response) {
          // La respuesta fue hecha y el servidor respondió con un código de estado
          // que esta fuera del rango de 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // La petición fue hecha pero no se recibió respuesta
          // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
          // http.ClientRequest en node.js
          console.log(error.request);
        } else {
          // Algo paso al preparar la petición que lanzo un Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
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
            <Form method="post" onSubmit={onSubmitForm}>
              <FormGroup className="mb-3" controlId="email">
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
                    <a
                      href="/"
                      className="small text-muted text-decoration-none"
                    >
                      ¿Olvidó su contraseña?
                    </a>
                  </Col>
                </Row>

                <InputGroup className="mb-3">
                  <FormControl
                    id="password"
                    aria-describedby="passwordAdd"
                    placeholder="***********"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputGroup.Text id="passwordAdd">
                    <FontAwesomeIcon icon={faEye} />
                  </InputGroup.Text>
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
                <Button variant="primary" type="submit">
                  Iniciar sesión
                </Button>
              </div>
            </Form>
            <div className="text-center">
              <p className="text-muted mb-0">
                ¿Aún no tienes una cuenta?{" "}
                <a href="/" className="text-decoration-none">
                  Regístrate aquí
                </a>
              </p>
            </div>
            <div className="border-top mt-3 pt-3 d-grid gap-2">
              <Button variant="outline-danger">
                <FontAwesomeIcon icon={faGoogle} /> Iniciar sesión con Google
              </Button>{" "}
              <Button variant="outline-primary">
                <FontAwesomeIcon icon={faFacebook} /> Iniciar sesión con
                Facebook
              </Button>{" "}
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
