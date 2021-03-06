const express = require("express");
const routerLS = new express.Router();
const UserData = require('../models/auth');
const isOkEmail = require('./middleware/Emailvarification');
const bcrypt = require('bcryptjs');
const tokenobj = require('./middleware/jwt');
const Authentication = require('./middleware/authentication');
const Post = require("../models/Post");

routerLS.post('/signup', async(req, res) =>{
    const {fullname, username, email, password ,cpassword} = req.body;
    if (password != cpassword) {
        res.send({isVarified: false, massage: `both passward didn't match`});
    }
    const first = await UserData.findOne({$or:[{username: username}, {email: email}]}).select({__id: true});
    if (first != null) {
        res.send({isVarified: false, massage: `email and username is not unique`});
    }
    if (username.indexOf('@') == -1) {
        res.send({isVarified: false, massage: `usename can only contain alphanumeric values`});
    }
    let val = await isOkEmail(email, fullname);
    res.send({val: val, massage: `email varification OTP`});
});

routerLS.patch('/signup', async(req, res) =>{
    const {fullname, image, username, email, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 12);
    const newData = new UserData({
        fullname: fullname,
        image: image,
        username: username,
        email: email,
        password: hashedpassword,
    });
    const result = await newData.save();
    res.send({massage: 'account created'});
});

routerLS.post('/login', async(req, res) =>{
    const {username, password} = req.body;
    const result = await UserData.findOne({username: username});
    if(result == null) {
        res.send({isVarified: false, massage: 'username not exist please check username'});
    } else if (!await bcrypt.compare(password, result.password)) {
        res.send({isVarified: false, massage: 'password is not correct please forget password'});
    } else {
        const token = await tokenobj.CreateToken(result._id);
        let options = {
            maxAge: 1000 * 60 * 120,
            httpOnly: true,
        }
        res.cookie('user_id', token , options)
        res.send({isVarified: true, massage: 'found'});
    }
});

routerLS.get('/forgetpass', async (req, res) =>{
    const { emailorusername } = req.body;
    let result, flag;
    if (emailorusername.indexOf('@') != -1) {
        result = await UserData.findOne({email: emailorusername}).select({email: true, fullname: true});
        flag = true
    } else {
        result = await UserData.findOne({username: emailorusername}).select({email: true, fullname: true});
        flag = false;
    }
    if (result == null) {
        res.send({isVarified: false, massage:'user with this email or username not exist please check again'});
    } else {
        const {email, fullname} = result;
        let val = await isOkEmail(email, fullname);
        res.send({isVarified: true, massage:'proceed further', val: val, isemail: flag});
    }
});

routerLS.patch('/forgetpass', async(req, res) =>{
    const { isemail, password, cpassword, emailorusername } = req.body;
    let result;
    if (password != cpassword) {
        res.send({isVarified: false, massage: `both passward didn't match`});
    }
    const hashedpassword = await bcrypt.hash(password, 12);
    if (isemail) {
        result = await UserData.updateOne({email: emailorusername}, {
            $set: {
                password: hashedpassword
            }
        }, { useFindAndModify: false });
    }
    else {
        result = await UserData.updateOne({username: emailorusername}, {
            $set: {
                password: hashedpassword
            }
        }, { useFindAndModify: false });
    }
    res.send({isVarified: true, massage: `you can login with new password`})
})

routerLS.post('/home', Authentication, async(req, res) => {
    const { myid } = req.user;
    const result = await UserData.findById(myid).select({password: false, friendChats: false});
    const obj = {
        ...result,
        newmessage: result.newmessage.length,
        friendrequest: result.friendrequest.length
    }
    const result1 = await Post.find();
    res.send({isVarified: cookieobj.isVarified, data: obj, posts: result1});
});

module.exports = routerLS;