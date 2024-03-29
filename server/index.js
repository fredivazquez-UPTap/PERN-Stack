const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const auth = require("./controllers/auth");
const users = require("./controllers/users");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/auth", auth);
app.use("/api/users", users);

const connectionData = {
  user: "postgres",
  host: "localhost",
  database: "pern",
  password: "1234567890",
  port: 5432,
};


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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
