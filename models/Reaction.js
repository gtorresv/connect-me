const { Schema, model } = require('mongoose');

// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionId: [
            {
                type: Schema.Types.ObjectId,
                //default: new.ObjectId,
            },
        ],
        reactionBody: {
            type: String,
            required: true,
            // 280 characters max
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // getter method to format timestamp on query
        }
    }
);

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;