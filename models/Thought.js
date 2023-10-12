const { Schema, model } = require('mongoose');
const { reactionSchema } = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            // must be between 1 & 280 characters
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // getter method
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;