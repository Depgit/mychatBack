const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserData = require('../models/auth')
const Post = require('../models/Post')
const routerLS = require('./routerls')
const routerFriend = require('./rourterfriend');
const routersearch = require('./routerSearch')
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;
const dbu = `mongodb+srv://rayvivek881:qDZxzeDbbeIRXWOg@nodetuts.6d6nn.mongodb.net/Database?retryWrites=true&w=majority`;

mongoose.connect(dbu, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {console.log('Connection successful..........');})
    .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routerLS);
app.use(routerFriend);
app.use(routersearch)

app.listen(port, () => { 
    console.log(`we are working port ${port}`);
});