const express = require("express");
const routerPost = new express.Router();
const Authentication = require('./middleware/authentication')
const Post = require('../models/Post');
const UserData = require('../models/auth');

routerPost.post('/createpost', Authentication, async (req, res) => {
    const { myid } = req.user;
    const {image, username, Title, data} = req.body;
    const newpost = new Post({
        image,
        username,
        Title,
        data
    });
    const result = await newpost.save();
    const result1 = await UserData.updateOne({_id: myid}, {
        $push : {
            posts : result._id 
        }
    }, { useFindAndModify: false });
    res.send({});
})

routerPost.get('/mypost/:id',  async (req, res) => {
    const { id } = req.params;
    const result = await UserData.findById(id).select({posts: true});
    let getit = [];
    for (let item in result.posts) {
        getit.push({_id: item});
    }
    const myposts = await Post.find({$or: getit});
    res.send({myposts: myposts})
})
routerPost.delete('/mypost', Authentication, async (req, res) => {
    const { myid } = req.user, { postid } = req.quary;
})
module.exports = routerPost;