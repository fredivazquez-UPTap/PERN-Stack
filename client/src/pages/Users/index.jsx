import React, { useState, useEffect } from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/users").then((response) => {
      setUsers(response.data);
    });
  });

  return (
    <div>
      <h1>Usuarios</h1>
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
      <Table striped bordered hover responsive="sm" className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Activo</th>
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
                    icon={user.is_active ? faCheck : faTimes}
                    className={user.is_active ? "text-success" : "text-danger"}
                  />
                </td>
                <td>{new Date(user.created_at).toLocaleTimeString()}</td>
                <td>{new Date(user.modified_at).toLocaleString()}</td>
                <td>
                  <Button variant="outline-success">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{" "}
                  <Button variant="outline-danger">
                    <FontAwesomeIcon icon={faTrashAlt} />
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
