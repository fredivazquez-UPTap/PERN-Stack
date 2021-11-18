import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserEdit,
  faUserLock,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Users = () => {
  const jwt = localStorage.getItem("token");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers(jwt);
  }, [jwt]);

  const getUsers = async (token) => {
    const instance = axios.create({
      baseURL: "http://localhost:3001/api",
      headers: { Authorization: `Bearer ${token}` },
    });
    try {
      const { data } = await instance.get("/users");
      setUsers(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text id="searchInput">
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <FormControl
          placeholder="Buscar por correo electrónico"
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </InputGroup>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Registro</th>
            <th>Última modificación</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => {
              return user.email.toLowerCase().includes(search.toLowerCase());
            })
            .map((user, index) => (
              <tr key={index} className="align-middle">
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role_name}</td>
                <td>
                  <FontAwesomeIcon
                    icon={user.is_active ? faUserCheck : faUserLock}
                    className={user.is_active ? "text-success" : "text-danger"}
                  />{" "}
                  {user.is_active ? "Activo" : "Inactivo"}
                </td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td>{new Date(user.modified_at).toLocaleString()}</td>
                <td>
                  <Button
                    variant="outline-success"
                    onClick={() => navigate(`/users/${user.user_id}`)}
                  >
                    <FontAwesomeIcon icon={faUserEdit} />
                  </Button>{" "}
                  <Button variant="outline-danger">
                    <FontAwesomeIcon icon={faUserLock} />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
