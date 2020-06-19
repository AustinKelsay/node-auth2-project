const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    const secret = secrets.jwtSecret;

    if(token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if(error) {
                //the token is invalid
                res.status(401).json({message: "You shall not pass!"})
            } else {
                req.decodedToken = decodedToken;
                next();
            }

        })
    } else {
        res.status(401).json({message: "Please provide correct credentials"})
    }


};