const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

const app = express();
const port = 3000;

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
    .query("SELECT * FROM users")
    .then((response) => {
      console.log(response.rows);
      res.json(response.rows);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
});

//Get a user
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const client = new Client(connectionData);
  client.connect();
  client
    .query("SELECT * FROM users WHERE user_id = $1", [id])
    .then((response) => {
      res.json(response.rows);
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

app.put("/user", function (req, res) {
  res.send("Got a PUT request at /user");
});

app.delete("/user", function (req, res) {
  res.send("Got a DELETE request at /user");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
