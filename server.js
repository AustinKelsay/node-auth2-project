const express = require('express');
const registerRouter = require("./api/registerRouter");
const loginRouter = require("./api/loginRouter");
const usersRouter = require("./api/usersRouter");
const session = require('express-session');

const server = express();

const sessionConfig = {
  name: 'Default name?', //changing the default name can protect you from attackers looking for specific session libs
  secret: "keep it safe, keep it secret!",
  cookie: {
    maxAge: 1000 * 45,
    secure: false, //<-- Wants to see if cookie can be sent over non-encrypted communications (should be true in production)
    httpOnly: true, 
  },
  resave: false,
  saveUninitialized: false, // GDPR laws against setting cookies automatically 
};

server.use(express.json());
server.use(session(sessionConfig))

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
server.use('/api/users', usersRouter);

server.get("/", (req, res) => {
    res.json({
    message: "Welcome!"
    })
  });


module.exports = server;