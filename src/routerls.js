const express = require("express");
const routerLS = new express.Router();
const UserData = require('../models/auth');
const isOkEmail = require('./Emailvarification')

routerLS.post('/signup', async(req, res) =>{
    const {fullname, username, email, password } = req.body;
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
    const newData = new UserData({
        fullname: fullname,
        image: image,
        username: username,
        email: email,
        password: password,
        friendChats: []
    });
    const result = await newData.save();
    res.send({massage: 'account created'});
});

routerLS.post('/login', async(req, res) =>{
    const {username, password} = req.body;
    const result = await UserData.findOne({username: username});
    if(result == null) {
        res.send({isVarified: false, massage: 'username not exist please check username'});
    } else if (result.password != password) {
        res.send({isVarified: false, massage: 'password is not correct please forget password'});
    } else {
        res.send({isVarified: true, massage: 'found', data: result});
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
    if (isemail) {
        result = await UserData.updateOne({email: emailorusername}, {
            $set: {
                password: password
            }
        }, { useFindAndModify: false });
    }
    else {
        result = await UserData.updateOne({username: emailorusername}, {
            $set: {
                password: password
            }
        }, { useFindAndModify: false });
    }
    res.send({isVarified: true, massage: `you can login with new password`})
})

routerLS.get('/profile', async(req, res) => {
    const {username, myone} = req.body;
    const result = await UserData.findOne({username: username}).select({friendChats: false, password: false});
    res.send({isEditable: myone, data: result});
})

module.exports = routerLS;