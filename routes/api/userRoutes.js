const router = require('express').Router();
const { User, Thought } = require('../../models');

// /api/users

// GET all users

// GET a single user by its id and populate thought and friend data

// POST a new user

// PUT update a user by its id

// DELETE to remove user by its id

//BONUS: Remove a users associated thoughts when deleted
// /api/users/:userId/friends/:friendId

// POST to add a new friend to a users friend list

// DELETE to remove a friend from a users friend list