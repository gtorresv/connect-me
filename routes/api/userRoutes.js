const router = require('express').Router();
const { User } = require('../../models');

// /api/users

// GET all users
router.route('/').get(async function(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
      console.log(error);  
    }
});

// GET a single user by its id and populate thought and friend data
router.route('/:userId').get(async function(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends');
        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

// POST a new user
router.route('/').post(async function(req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

// PUT update a user by its id
router.route('/:userId').put(async function(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

// DELETE to remove user by its id
router.route('/:userId').delete(async function(req, res) {
    try {
        const user = await User.findOneAndDelete({
            _id: req.params.userId
        });
        res.status(200).json({ message: 'User has been deleted!' });
    } catch (error) {
        console.log(error);
    }
});

// Remove a users associated thoughts when deleted
// /api/users/:userId/friends/:friendId

// POST to add a new friend to a users friend list
router.route('/:userId/friends/:friendId').post(async function(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            { $push: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

// DELETE to remove a friend from a users friend list
router.route('/:userId/friends/:friendId').delete(async function(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            {_id: req.params.userId},
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;