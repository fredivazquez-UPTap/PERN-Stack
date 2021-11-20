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
      error: "Hace falta token con autorización.",
    });
  }
});

//Get a user by id
router.get("/id/:id", async (request, response) => {
  const authorization = request.get("authorization");
  let token = null;
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1];
    const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (decodedToken.role_id == 1) {
      const id = parseInt(request.params.id);
      const client = new Client(connectionData);
      client.connect();
      const result = await client.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id]
      );
      if (result.rowCount == 0) {
        response.json({
          message: "User not found!",
        });
      } else {
        response.json(result.rows[0]);
      }
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

//Update user by id
router.put("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const { username, email, is_active, role_id } = req.body;
  const client = new Client(connectionData);
  client.connect();
  client
    .query(
      "UPDATE users SET username = $1, email = $2, is_active = $3, role_id = $4, modified_at = CURRENT_TIMESTAMP WHERE user_id = $5",
      [username, email, is_active, role_id, id]
    )
    .then((response) => {
      res.json({
        message: "User updated successfully!",
      });
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
});

module.exports = router;
