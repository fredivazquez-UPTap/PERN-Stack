import React from "react";
import { Link, useParams } from "react-router-dom";

const User = () => {
    const {userId} = useParams();
    return (
        <>
        <h2>User: {userId}</h2>
        <Link to="/users">Regresar a Usuarios</Link>
        </>
    )
}

export default User;