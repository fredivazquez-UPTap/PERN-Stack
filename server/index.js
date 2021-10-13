const express = require("express");
const app = express();
const port = 2500;
const pg = require("pg");

var connectionString = "pg://postgres:postgres@localhost:5432/db";
var client = new pg.Client(connectionString);
client.connect();

var queryString = "SELECT * FROM students";
var query = client.query(queryString);

query.on("row", (row, result) => {
  result.addRow(row);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Conexión exitosa.`);
});
