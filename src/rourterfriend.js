const express = require("express");
const routerFriend = new express.Router();
const UserData = require('../models/auth');

routerFriend.get('/profile', async(req, res) => {
    const {username, isEditable} = req.body;
    const result = await UserData.findOne({username: username}).select({friendChats: false, password: false});
    res.send({isEditable: isEditable, data: result});
})

routerFriend.put('/friendreq', async(req, res) => {
    const {myid, friendid} = req.query;
    const result = await UserData.updateOne({_id: friendid}, {
        $push: {friendrequest: myid}
    }, { useFindAndModify: false })
    res.send({status: 'added'});
})

module.exports = routerFriend;