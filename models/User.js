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
            // match a valid email address with mongoose
        },
        thoughts: {

        },
        friends: {

        }
        
    }
);

const User = model('user', userSchema);

module.exports = User;