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
      if (password == user.password) {
        const userForToken = {
          id: user.user_id,
          username: user.username,
          email,
          is_active: user.is_active,
        };
        const token = jsonwebtoken.sign(userForToken, process.env.JWT_SECRET, {
          expiresIn: process.env.TOKEN_EXPIRES_IN,
        });
        response.json({ token });
      } else {
        response.status(401).json({
          error: "Contraseña incorrecta",
        });
      }
    } else {
      response.status(401).json({
        error: "Usuario incorrecto.",
      });
    }
    response.json({
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
