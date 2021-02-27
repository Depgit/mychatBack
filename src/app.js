const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserData = require('../models/auth')
const Post = require('../models/Post')
const routerLS = require('./routerls')
const routerFriend = require('./rourterfriend');
const routersearch = require('./routerSearch')
const routerPost = require('./routerpost')
const cookieParser = require('cookie-parser');
const {MONGOURI} = require('./keys.js');
const port = process.env.PORT || 8000;

const db = MONGOURI;

// install this dependency
// const bodyParser = require("body-parser");
// const passport = require("passport");
// const cors = require("cors");


// check this if work else leave
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {console.log('Connection successful..........');})
    .catch((err) => console.log(err));



const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);


const io = require("socket.io").listen(server);

// Body Parser middleware to parse request bodies
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(cors());

app.use(bodyParser.json());
// CORS middleware
app.use(cors());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Successfully Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Assign socket object to every request
app.use(function (req, res, next) {
  req.io = io;
  next();
});


// till here









app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routerLS);
app.use(routerFriend);
app.use(routersearch);
app.use(routerPost);

app.listen(port, () => { 
    console.log(`we are working port ${port}`);
});
