const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
})

userSchema.pre('save', function(next) {
    const user = this;
    console.log(this);
    //generating salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }
        //hashing the password using generated salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }
            //overwriting the plain text password with encrypted password
            user.password = hash;
            next();
        })
    })
    console.log(this);
})

//Adding compare password method to userSchema
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }
        callback(null, isMatch);
    })
}

module.exports = mongoose.model('user', userSchema);