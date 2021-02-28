const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// Create Schema for Users
const MessageSchema = new mongoose.Schema({
    conversation: {
        type: ObjectId,
        ref: 'Post',
    },
    to: {
        type: ObjectId,
        ref: 'UserData',
    },
    from: {
        type: ObjectId,
        ref: 'UserData',
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports =  mongoose.model('messages', MessageSchema);
