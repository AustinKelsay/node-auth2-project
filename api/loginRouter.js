const express = require('express');
const router = express.Router();
const Users = require("../data/users-schema")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");


router.post("/", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({username: username})
    .then(user => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = createToken(user);

        res.status(201).json({
          message: `Welcome ${user.username}`,
          token
        });
        }  
      else res.status(401).json({message: "Invalid credentials"});
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


function createToken(user) {
  console.log("create token");
  //the content in payload is NOT encrypted but rather it is signed with the secret to make sure it was not altered
  const payload = {
    subject: user.id, //sub
    username: user.username,
    // ...other data
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: '8h',
  }


  return jwt.sign(payload, secret, options)
}

module.exports = router;