const { config } = require('../config/config'); 
// if config without {} => config = {config: '******'}
let userService = require('../services/userService');
let jwt = require('jsonwebtoken');

async function registerUser (req, res, next) {
    let username = req.body['username'];
    let password = req.body['password'];
    try{
        let user = await userService.register(username, password);
        let payload = {id: user._id};
        const token = jwt.sign(payload, config.TOKEN_SECRET);
        res.status(200).send({token});
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: "User already exist"
        });
    }

}

async function loginUser(req, res, next) {
    let username = req.body['username'];
    let password = req.body['password'];
    try {
        let user = await userService.login(username, password);
        let payload = {id: user._id};
        const token = jwt.sign(payload, config.TOKEN_SECRET);
        res.status(200).send({token});
    } catch (err) {
        console.log(err);
        res.status(401).send({
            message: "Invalid user"
        });
    }
}

async function getUserById(req, res, next) {
    let userId = req.params['id'];
    let user = await userService.getUserById(userId);
    res.status(200).json(user);
}

module.exports = {
    registerUser,
    loginUser,
    getUserById
}