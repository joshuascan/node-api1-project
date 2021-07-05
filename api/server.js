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
        res.status(500).json({
          message: "There was an error while saving the user to the database",
        });
      });
  }
});

// [GET] /api/users
server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The users information could not be retrieved",
      });
    });
});

// [GET] /api/users/:id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "The user information could not be retrieved",
      });
    });
});

// [DELETE] /api/users/:id
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  User.remove(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

// [PUT] /api/users/:id
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    User.update(id, { name, bio }).then((updated) => {
      if (!updated) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(updated);
      }
    });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
