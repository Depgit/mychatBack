const express = require("express");
const routersearch = new express.Router();
const UserData = require('../models/auth');
const Authentication = require('./middleware/authentication')



module.exports = routersearch;