const express = require("express");
const routerLS = new express.Router();
const UserData = require('../models/auth');

routerLS.post('/signup', async(req, res) =>{
    if (req.body.password != req.body.cpassword) {
        res.send({isVarified: false, massage: `both passward didn't match`})
    }
    
})

module.exports = routerLS;