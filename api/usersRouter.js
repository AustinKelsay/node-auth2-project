const express = require('express');
const router = express.Router();
const Users = require("../data/users-schema")
const restricted = require("./middleware/restrictedMiddleware");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then((users) => {
      res.json({users, decodedToken: req.decodedToken });
    })
    .catch((err) => res.send(err));
});

module.exports = router;