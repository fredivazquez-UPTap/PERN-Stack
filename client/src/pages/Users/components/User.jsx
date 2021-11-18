import React from "react";
import { Link, useParams } from "react-router-dom";

const User = () => {
  const params = useParams();
  return (
    <>
      <h2>User: {params.userId}</h2>
      <Link to="/users">Regresar a Usuarios</Link>
    </>
  );
};

export default User;
