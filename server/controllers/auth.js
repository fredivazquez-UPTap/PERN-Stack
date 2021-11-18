const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const { Client } = require("pg");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();

const connectionData = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

router.post("/signin", async (request, response) => {
  const { email, password } = request.body;
  const client = new Client(connectionData);
  client.connect();
  try {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rowCount == 1) {
      const user = result.rows[0];
      if (user.is_active) {
        if (password == user.password) {
          const userForToken = {
            id: user.user_id,
            username: user.username,
            email,
            is_active: user.is_active,
            role_id: user.role_id,
          };
          const token = jsonwebtoken.sign(
            userForToken,
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.TOKEN_EXPIRES_IN,
            }
          );
          response.json({ token });
          client.end();
        } else {
          response.status(401).json({
            error: "Contraseña incorrecta.",
          });
          client.end();
        }
      } else {
        response.status(401).json({
          error: "Usuario inactivo.",
        });
        client.end();
      }
    } else {
      response.status(401).json({
        error: "Correo electrónico incorrecto.",
      });
      client.end();
    }
  } catch (err) {
    response.status(401).json({
      error: err.message,
    });
    client.end();
  }
});

module.exports = router;
