// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const User = require("./users/model");

server.use(express.json());

// [POST] /api/users
server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    const { name, bio } = req.body;
    User.insert({ name, bio })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res
          .status(500)
          .json({
            message: "There was an error while saving the user to the database",
          });
      });
  }
});

// [GET] /api/users
server.get("/api/users", (req, res) => {
  res.status(200).json({ message: "get users" });
  console.log("GET");
});

// [GET] /api/users/:id
server.get("/api/users/:id", (req, res) => {
  res.status(200).json({ message: "get specific user" });
  console.log("GET");
});

// [DELETE] /api/users/:id
server.delete("/api/users/:id", (req, res) => {
  res.status(200).json({ message: "delete user" });
  console.log("DELETE");
});

// [PUT] /api/users/:id
server.put("/api/users/:id", (req, res) => {
  res.status(201).json({ message: "edit user" });
  console.log("EDIT");
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
