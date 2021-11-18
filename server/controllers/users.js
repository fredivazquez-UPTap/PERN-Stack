const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const router = express.Router();
const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const connectionData = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

router.get("/", async (request, response) => {
  const authorization = request.get("authorization");
  let token = null;
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1];
    const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (decodedToken.role_id == 1) {
      const client = new Client(connectionData);
      client.connect();
      const result = await client.query(
        "SELECT u.*, r.role_name FROM users u INNER JOIN roles r ON u.role_id = r.role_id ORDER BY u.role_id ASC"
      );
      response.json(result.rows);
      client.end();
    } else {
      response.status(401).json({
        error: "Acceso denegado. Requiere permiso de ADMINISTRADOR",
      });
    }
  } else {
    response.status(401).json({
      error: "Hace falta token con autenticación.",
    });
  }
});

module.exports = router;
