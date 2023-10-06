const { Schema, model } = require('mongoose');

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
        reactions: {
            // array of nested documents created with reactionSchema
        },
    },
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;