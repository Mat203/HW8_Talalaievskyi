const { saveUser, updateUser, removeUser } = require('../helpers/users');
const User = require('../models/user');

function extractUserData(req) {
    return {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    };
}

async function getUserListController(req, res) {
    try {
        const users = await User.find();
        res.render('users-list', { qty: users.length, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUserByIdController(req, res) {
    const userId = req.params.id;
    try {
        const user = await User.findOne({ _id: userId });
        res.render('user-profile', { user: user});
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


function createUser(req, res) {
    res.render('create-user-form');
}

function postUserController(req, res) {
    const { firstName, lastName, email, password, isAdmin } = extractUserData(req);
    saveUser(firstName, lastName, email, password, isAdmin)
        .then((user) => res.render('user-profile', {user: user}))
        .catch(() => res.send('user NOT created'));
}


async function getUserUpdateFormController(req, res) {
    const userId = req.params.id;
    try {
        const user = await User.findOne({ _id: userId });
        res.render('update-user-form', {user: user});
    } catch (error) {
        console.error('Error fetching user to update:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function putUserController(req, res) {
    const userId = req.params.id;
    const userObj = {};
    userObj.userName = req.body.name;
    userObj.lastname = req.body.lastname;
    userObj.email = req.body.email;
    userObj.password = req.body.password;
    updateUser(userId, userObj)
        .then(() => res.redirect(`/users/${userId}`))
        .catch(() => res.send('user NOT updated'));
}

async function patchUser(req, res) {
    const userId = req.params.id;
    const updateData = extractUserData(req);
    try {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function deleteUserController(req, res) {
    const userId = req.params.id;
    try {
        await User.deleteOne({ _id: userId });
        res.status(200).json({ message: 'user deleted' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getUserListController,
    getUserByIdController,
    createUser,
    postUserController,
    getUserUpdateFormController,
    putUserController,
    patchUser,
    deleteUserController,
};