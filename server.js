require('dotenv').config();
 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');
const { json } = require('body-parser');
 
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
    slogan: "Sinh ra là để tỏa sáng.",
    relationship: 0,
    avatar: "./imgs/img_admin.png",
    friends: ["1","2"]
  },
  {
    userId: 1,
    name: "Nguyen Van A",
    birthday: "24",
    hobby: "Đá bóng",
    slogan: "Kề vai sát cánh.",
    relationship: 1,
    avatar: "./imgs/feed1.jpg",
    friends: ["0"]
  },
  {
    userId: 2,
    name: "Tran Thi Thao",
    birthday: "27",
    hobby: "Hát",
    slogan: "Giá trị tích lũy niềm tin.",
    relationship: 1,
    avatar: "./imgs/feed2.jpg",
    friends: ["1"]
  },
];

//static feeds
const feeds = [{
  id: 0,
  content: "Chiều 26-7, ông Đình Thành Tiến, chủ tịch UBND xã Cát Khánh, huyện Phù Cát (Bình Định) cho biết vào sáng cùng ngày tại khu vực Hòn Trâu, thuộc vùng biển Đề Gi xuất hiện 2 con cá voi xanh trước sự kinh ngạc của nhiều du khách và hướng dẫn viên.",
  image: "./imgs/feed1.jpg",
  authorId: 0,
  createDate: 2022/7/24,
  updateDate: "",
  shareTo: "1",
  like: 23,
},
{
  id: 1,
  content: "Cá mập voi là loài ăn lọc và từ lâu giới khoa học đã quan sát chúng ăn nhuyễn thể ở rạn san hô Ningaloo ngoài khơi Tây Australia. Nhưng khi các nhà nghiên cứu phân tích mẫu sinh thiết từ cá mập voi sống quanh rạn san hô, họ phát hiện thực chất chúng ăn rất nhiều thực vật.",
  image: "./imgs/feed2.jpg",
  authorId: 1,
  createDate: 2022/7/25,
  updateDate: "",
  shareTo: "0",
  like: 0,
},
{
  id: 2,
  content: "Cá mập voi là loài ăn lọc và từ lâu giới khoa học đã quan sát chúng ăn nhuyễn thể ở rạn san hô Ningaloo ngoài khơi Tây Australia. Nhưng khi các nhà nghiên cứu phân tích mẫu sinh thiết từ cá mập voi sống quanh rạn san hô, họ phát hiện thực chất chúng ăn rất nhiều thực vật.",
  image: "./imgs/feed2.jpg",
  authorId: 1,
  createDate: 2022/7/24,
  updateDate: "",
  shareTo: "0",
  like: 0,
},
{
  id: 3,
  content: "Cá mập voi là loài ăn lọc và từ lâu giới khoa học đã quan sát chúng ăn nhuyễn thể ở rạn san hô Ningaloo ngoài khơi Tây Australia. Nhưng khi các nhà nghiên cứu phân tích mẫu sinh thiết từ cá mập voi sống quanh rạn san hô, họ phát hiện thực chất chúng ăn rất nhiều thực vật.",
  image: "./imgs/feed2.jpg",
  authorId: 2,
  createDate: 2022/7/24,
  updateDate: "",
  shareTo: "0",
  like: 0,
},
{
  id: 4,
  content: "Cá mập voi là loài ăn lọc và từ lâu giới khoa học đã quan sát chúng ăn nhuyễn thể ở rạn san hô Ningaloo ngoài khơi Tây Australia. Nhưng khi các nhà nghiên cứu phân tích mẫu sinh thiết từ cá mập voi sống quanh rạn san hô, họ phát hiện thực chất chúng ăn rất nhiều thực vật.",
  image: "./imgs/feed2.jpg",
  authorId: 1,
  createDate: 2022/7/24,
  updateDate: "",
  shareTo: "1",
  like: 0,
},
]
 
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

// request get feeds.
app.get('/feeds', function (req, res) {
  return res.json({ feeds });
});

//request add new feed
app.post('/feeds/add-new-feed', function (req, res) {
  const feed = req.body;
  feeds.unshift(feed);
  return res.json({feeds});
});

//request delete feed
app.post('/feeds/delete-feed', function (req, res) {
  const feedId = req.body.id;
  for (let i = 0; i < feeds.length; i++) {
    if (feeds[i].id === feedId) {
      feeds.splice(i, 1);
    }
  }
  return res.json({feeds});
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