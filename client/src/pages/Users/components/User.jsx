import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Row, Col } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const User = () => {
  const { userId } = useParams();
  const jwt = localStorage.getItem("token");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setActive] = useState(false);
  const [rol, setRol] = useState(null);

  useEffect(() => {
    async function fecthData() {
      try {
        const { data } = await axios
          .create({
            baseURL: "http://localhost:3001/api",
            headers: { Authorization: `Bearer ${jwt}` },
          })
          .get(`/users/id/${userId}`);
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
        setActive(data.is_active);
        setRol(data.role_id);
      } catch (err) {
        console.log(err.message);
      }
    }
    fecthData();
  }, [jwt, userId]);

  const handleUser = (token) => {
    const instance = axios.create({
      baseURL: "http://localhost:3001/api",
      headers: { Authorization: `Bearer ${token}` },
    });
    try {
      instance.put(`/users/${userId}`, {
        username,
        email,
        is_active: isActive,
        role_id: rol,
      });
      navigate("/users");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Link to="/users" className="btn btn-primary">
        <FontAwesomeIcon icon={faArrowLeft} /> Regresar a Usuarios
      </Link>
      <hr />
      {user ? (
        <>
          <Form onSubmit={handleUser}>
            <Row>
              <FormGroup as={Col} className="mb-3" controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup as={Col} className="mb-3" controlId="email">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup as={Col} className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Form.Text className="text-muted">
                  La contraseña debe de tener al menos 8 caracteres, usar
                  minúsculas, mayúsculas y números.
                </Form.Text>
              </FormGroup>
              <FormGroup as={Col} className="mb-3" controlId="passwordConfirm">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup as={Col} className="mb-3" controlId="rol">
                <Form.Label>Rol</Form.Label>
                <Form.Select
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  required
                >
                  <option value="1">ADMINISTRADOR</option>
                  <option value="5">MODERADOR</option>
                  <option value="3">PROFESOR</option>
                  <option value="4">ESTUDIANTE</option>
                </Form.Select>
              </FormGroup>
              <Form.Group as={Col} className="mb-3" controlId="is-active">
                <Form.Label>Estado</Form.Label>
                <Form.Check
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setActive(e.target.checked)}
                  label="Activo"
                  required
                />
              </Form.Group>
            </Row>
            <Button type="submit" className="w-100">
              Actualizar datos
            </Button>
          </Form>
        </>
      ) : (
        <h2>Usuario no encontrado</h2>
      )}
    </>
  );
};

export default User;
