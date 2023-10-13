const { Schema, model, Types } = require('mongoose');

// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionId: [
            {
                type: Schema.Types.ObjectId,
                //default value set to a new ObjectId
                default: new Types.ObjectId(),
            },
        ],
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Getter method to format timestamp on query
reactionSchema.virtual('formattedTimestamp').get(function() {
    const formattedTime = new Date(this.createdAt);
    return formattedTime.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})
});

const Reaction = model('Reaction', reactionSchema);

module.exports = { Reaction, reactionSchema };