const bcrypt = require('bcrypt');
const User = require('../models/user');

async function register (username, password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    let user = new User({
        username: username,
        password: hashPassword
    });
    return user.save();
}

async function login(username, password) {
    const filter = {
        username: username
    };
    const user = await User.findOne(filter);
    // cannot get user data successfully without await
    if(user) {
        const validPass = await bcrypt.compare(password, user.password);
        if(validPass) {
            return user;
        } else {
            throw Error('Invalid user or password!');
        }
    }
    throw Error('Invalid user or password!');
}

module.exports = {
    register,
    login
}