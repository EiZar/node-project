const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { config } = require('../config/config');

const verifyUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    if(!token) return res.status(401).send("Access Denied / Unauthorized Request");
    try {
        token = token.split(' ')[1] // remove bearer from string
        if(token === null || !token ) return res.status(401).send("Unauthorized Request");

        let verifiedUser = jwt.verify(token, config.TOKEN_SECRET); // get back payload
        // if token is correct, can get the data we put in payload when login/register
        if(!verifiedUser) return res.status(401).send("Unauthorized Request");

        // ****
        req.user = verifiedUser;
        next();
    } catch(err) {
        console.log(err);
        res.status(400).send("Invalid Token");
    }
}

module.exports = {
    verifyUserToken
}