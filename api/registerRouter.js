const express = require('express');
const router = express.Router();
const Users = require("../data/users-schema");
const bcrypt = require("bcrypt");


router.post("/", (req, res) => {
  let credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  Users.add(credentials)
    .then(user => {
      console.log(user);
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "server error", err });
    });
});

module.exports = router;