const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");

router.post("/signup", (req, res, next) => {
  const saltRounds = 12;
  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(req.body.password, salt))
    .then((hashedPassword) => {
      User.create({
        // name: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        name: req.body.name,
      })
        .then((newUser) => {
          res.json({ message: "successfully signed up new account" });
        })
        .catch((err) => {
          res.json(err);
        });
    });
});

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   auth: {
//     user: 'nick.borbe@ironhack.com',
//     pass: process.env.GMAILPASS
//   }
// });

// var mailOptions = {
//   from: 'ironadooptionsapp@ihadoptions.com',
//   to: newUser.email,
//   subject: 'automated email sent with nodemailer',
//   html: `<p>Thank you for signing up. Your username is ${newUser.username}</p>`
// };

//       transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//           req.flash('success', 'Successfully Signed Up');
//           req.session.currentlyLoggedIn = newUser;
//           res.redirect('/profile');
//         }
//       });
//       })
//     })
//     .catch(error => next(error));
// });

router.post("/login", (req, res, next) => {
  if (req.body.username === "" || req.body.password === "") {
    res.json({ error: "fields cannot be left blank" });
    return;
  }

  User.findOne({ email: req.body.email })
    .then((resultFromDB) => {
      if (!resultFromDB) {
        res.json({ error: "username password combination not correct" });
        return;
      } else if (
        bcryptjs.compareSync(req.body.password, resultFromDB.password)
      ) {
        req.session.currentlyLoggedIn = resultFromDB;
        res.json({ message: "successfully logged in" });
        return;
      } else {
        res.json({ error: "username password combination not correct" });
      }
    })
    .catch((error) => console.log(error));
});

function serializeTheUserObject(userObj) {
  let result = {};
  if (userObj.username) result.username = userObj.username;
  if (userObj.email) result.email = userObj.email;
  if (userObj._id) result._id = userObj._id;
  if (userObj.userType) result.userType = userObj.userType;
  return result;
}

router.get("/serializeuser", (req, res, next) => {
  if (!req.session.currentlyLoggedIn) {
    res.json(null);
  } else {
    User.findById(req.session.currentlyLoggedIn._id)
      // .populate("location")
      .then((theUser) => {
        console.log({ user: req.session.currentlyLoggedIn });
        res.json(serializeTheUserObject(theUser));
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.json({ message: "successfully logged out" });
  });
});

// router.post('/new-password', (req, res, next)=>{

//   if(req.body.newpass !== req.body.confirmnewpass){
//     res.redirect("/profile")
//     // need to show an error message here but cant yet
//   }

//   User.findById(req.session.currentlyLoggedIn._id)
//   .then(resultFromDB => {
//      if (bcryptjs.compareSync(req.body.oldpass, resultFromDB.password)) {
//       const saltRounds = 12;
//       bcryptjs
//       .genSalt(saltRounds)
//       .then(salt => bcryptjs.hash(req.body.newpass, salt))
//       .then(hashedPassword => {

//         User.findByIdAndUpdate(req.session.currentlyLoggedIn._id, {
//           password: hashedPassword
//         })
//         .then(()=>{
//           res.redirect('/profile');

//         })
//       })
//         .catch((err)=>{
//           next(err);
//         })
// }
// })
// })

module.exports = router;
