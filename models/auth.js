const mongoose = require('mongoose');
const loginSchema = mongoose.Schema({
    fullname: {
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
    friendChats: {
        type: Array,
        required: true
    },
    friendrequest: {
        type: Array
    }
}, {timestamps: true});
const UserData = mongoose.model('UserData', loginSchema);
module.exports = UserData;