const mongoConnection = require('../connections/mongoConnection');
const mongoose = mongoConnection.mongo;

const UserSchema =  new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isAdmin: Boolean,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;