const express = require("express");
const { Client } = require("pg");

const app = express();
const port = 3000;

const connectionData = {
  user: "postgres",
  host: "localhost",
  database: "pern",
  password: "1234567890",
  port: 5432,
};
const client = new Client(connectionData);
var users = {};
client.connect();
client
  .query("SELECT * FROM users")
  .then((response) => {
    console.log(response.rows);
    users = response.rows;
    client.end();
  })
  .catch((err) => {
    console.log(err);
    client.end();
  });

app.get("/", (req, res) => {
  res.send(`Usuarios: ${users}`);
});

app.post("/", function (req, res) {
  res.send("Got a POST request");
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
