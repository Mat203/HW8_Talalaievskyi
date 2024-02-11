const User = require('../models/user');

function saveUserInDatabase(firstName, lastName, email, password, isAdmin) {
    const user = new User({ firstName: firstName, lastName: lastName, email: email, password: password, isAdmin: isAdmin});
    return user.save();
}

async function updateUserInDatabase(id, userData) {
    try {
        return await User.findOneAndUpdate({ _id: id }, { $set: userData });
    } catch (error) {
        console.error('error', error);
        return false;
    }
}

async function deleteUserInDatabase(id) {
    try {
        return await User.deleteOne({_id: id});
    } catch (error) {
        console.error('error', error);
        return false;
    }
}

module.exports = {
    saveUser: saveUserInDatabase,
    updateUser: updateUserInDatabase,
    removeUser: deleteUserInDatabase
};