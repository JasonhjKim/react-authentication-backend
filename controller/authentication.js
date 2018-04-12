const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timeStamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

exports.signup = function(req, res, next) {
    console.log("here");
    const email = req.body.email;
    const password = req.body.password;

    //Email and password validation
    if (!email || !password) {
        return res.status(422).send({ err: 'You must provide email and password' })
    }

    //Search user with email
    User.findOne({ email: email }, (err, foundUser) => {
        if (err) return next(err);
        //If a user with email already exist.
        if (foundUser) {
            return res.status(422).send({ err: "Email is in use" });
        }
    })
    //If a user with email does not exist
    const newUser = new User({
        //create new user
        email: email,
        password: password
    })
    newUser.save((err) => {
        if(err) return next(err)
        res.json({ token: tokenForUser(newUser) })
    })
}

exports.signin = function(req, res, next) {
    res.send({ token: tokenForUser(req.user) });
}