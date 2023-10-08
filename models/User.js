const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        first: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // matching a valid email address with mongoose
            match: [/.+@.+\..+/], 
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ]
        
    }
);

const User = model('User', userSchema);

module.exports = User;