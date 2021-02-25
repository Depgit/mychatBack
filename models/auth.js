const mongoose = require('mongoose');
const loginSchema = mongoose.Schema({
    Fullname: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    FriendChats: {
        type: Array,
        required: true
    }
}, {timestamps: true});
const UserData = mongoose.model('UserData', loginSchema);
module.exports = UserData;