const router = require('express').Router();
const { Reaction, Thought } = require('../../models');

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thoughts reaction array field

// DELETE to pull and remove a reaction by the reactions reactionId value