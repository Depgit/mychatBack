const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        required: true
    },
    Title: {
        type: String,
        required: true,
    },
    data: String,
    Comments: Array
}, {timestamps: true});
const Post = mongoose.model('Auth', PostSchema);
module.exports = Post;