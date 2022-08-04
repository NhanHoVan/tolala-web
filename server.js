require('dotenv').config();
 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');
 
const app = express();
const port = process.env.PORT || 4000;
let userData;
 
// static user details
const userLogin = [
  {
    userId: 0,
    password: "123",
    username: "admin",
    isAdmin: true
  },
  {
    userId: 1,
    password: "123",
    username: "user1",
    isAdmin: false
  },
  {
    userId: 2,
    password: "123",
    username: "user2",
    isAdmin: false
  },
];
// static user details
const userInfor = [
  {
    userId: 0,
    name: "Nhan Ho Van",
    birthday: "27",
    hobby: "Chạy",
    relationship: 0,
    avatar: "./imgs/img_admin.png"
  },
  {
    userId: 1,
    name: "Nguyen Van A",
    birthday: "24",
    hobby: "Đá bóng",
    relationship: 1,
    avatar: "./imgs/feed1.jpg"
  },
  {
    userId: 2,
    name: "Tran Thi Thao",
    birthday: "27",
    hobby: "Hát",
    relationship: 1,
    avatar: "./imgs/feed2.jpg"
  },
];
 
// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
 
 
//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  let token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue
 
  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});
 
 
// request handlers
app.get('/', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
});


// request get userInfor.
app.get('/users', function (req, res) {
  let token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  return res.json({ userInfor });
});
 
// validate the user credentials
app.post('/users/signin', function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;
 
  // return 400 status if username/password is not exist
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required."
    });
  }
 
  // return 401 status if the credential is not match.
  for (const element of userLogin) {
    let userDta = element;
    if (user === userDta.username && pwd === userDta.password) {
      userData = userDta;
      // generate token
      const token = utils.generateToken(userDta);
      // get basic user details
      const userObj = utils.getCleanUser(userDta);
      // return the token along with user details
      return res.json({ user: userObj, token });
    }
  }
  return res.status(401).json({
    error: true,
    message: "Username or Password is Wrong."
  });
});
 
 
// verify the token and return it if it's valid
app.get('/verifyToken', function (req, res) {
  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });
 
    // return 401 status if the userId does not match.
    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    // get basic user details
    let userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});
 
app.listen(port, () => {
  console.log('Server started on: ' + port);
});