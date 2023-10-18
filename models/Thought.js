const { Schema, model } = require('mongoose');
const { reactionSchema } = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual property for 'reactionCount' that retrieves the length of the thought's reactions array 
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Getter method for 'formattedTimestamp'
thoughtSchema.virtual('formattedTimestamp').get(function() {
    const formattedTime = new Date(this.createdAt);
    return formattedTime.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;