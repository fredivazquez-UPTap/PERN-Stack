const express = require("express");
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

router.get("/", (request, response) => {
  const client = new Client(connectionData);
  client.connect();
  client
    .query(
      "SELECT u.*, r.role_name FROM users u INNER JOIN roles r ON u.role_id = r.role_id ORDER BY u.user_id ASC"
    )
    .then((res) => {
      response.json(res.rows);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
});

module.exports = router;
