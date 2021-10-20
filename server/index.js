const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const connectionData = {
  user: "postgres",
  host: "localhost",
  database: "pern",
  password: "1234567890",
  port: 5432,
};

//Get all users
app.get("/api/users", (req, res) => {
  const client = new Client(connectionData);
  client.connect();
  client
    .query("SELECT * FROM users ORDER BY user_id ASC")
    .then((response) => {
      res.json(response.rows);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
});

//Get a user by id
app.get("/api/users/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const client = new Client(connectionData);
  client.connect();
  client
    .query("SELECT * FROM users WHERE user_id = $1", [id])
    .then((response) => {
      if (response.rowCount == 0) {
        res.json({
          message: "User not found!",
        });
      } else {
        res.json(response.rows[0]);
      }
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
});

//Get a user by username
app.get("/api/users/username/:username", (req, res) => {
  const username = req.params.username;
  const client = new Client(connectionData);
  client.connect();
  client
    .query("SELECT * FROM users WHERE username = $1", [username])
    .then((response) => {
      if (response.rowCount == 0) {
        res.json({
          message: "User not found!",
        });
      } else {
        res.json(response.rows);
      }
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
});

//Save new user
app.post("/api/users", function (req, res) {
  const { username, password, is_active } = req.body;
  console.log(req.body);
  const client = new Client(connectionData);
  client.connect();
  client
    .query(
      "INSERT INTO users (username, password, is_active) VALUES ($1, $2, $3)",
      [username, password, is_active]
    )
    .then((response) => {
      res.json({
        message: "User added successfully!",
        body: { user: { username, password, is_active } },
      });
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
});

//Update user by id
app.put("/api/users/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const { username, password, is_active } = req.body;
  const client = new Client(connectionData);
  client.connect();
  client
    .query(
      "UPDATE users SET username = $1, password = $2, is_active = $3 WHERE user_id = $4",
      [username, password, is_active, id]
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

//Delete user by id
app.delete("/api/users/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const client = new Client(connectionData);
  client.connect();
  client
    .query("DELETE FROM users WHERE user_id = $1", [id])
    .then((response) => {
      res.json({
        message: "User deleted successfully!",
      });
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
