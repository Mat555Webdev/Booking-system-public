const router = require("express").Router();
const passport = require("passport");
const User = require("../model/user.model");
//bcrypt will be used to encrypt and ecrypt passwords
const bcrypt = require("bcryptjs");

//below route authenticate a user using google
router.get(
  "/googlelogin",
  passport.authenticate("google", { scope: ["profile"] }),
  function (req, res) {
    res.redirect("/");
    res.send(profile);
  }
);
//below code will run once the user has logged in using
//google then redirect them to a different route
router.get(
  "/googlelogin/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/");
  }
);

//Post request below will store a user in the database.
router.post("/localSignUp", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, currentUser) => {
    if (err) {
      res.json("error adding user");
    }
    if (currentUser) {
      res.json("username already taken");
    } else {
      const newUser = new User({
        username,
        password,
      });
      //code below is going to encrypt the password before saving it to
      //the db
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save((err, savedUser) => {
            if (err) res.json("error adding user");
            else {
              res.json("savedUser");
            }
          });
        });
      });
    }
  });
});
//Post request below will authenticate
//user with local passport strategy
router.post(
  "/localLogin",
  (req, res, next) => {
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    let userinfo = {
      username: req.user.username,
    };
    res.json(userinfo);
  }
);
//github login for authentication
router.get(
  "/githublogin",
  passport.authenticate("github", { scope: ["profile"] }),
  function (req, res) {
    res.redirect("/");
    res.send(profile);
  }
);

router.get(
  "/githublogin/redirect",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
//below code will send back users details to check if someone
//is logged in or not
router.get("/usercheck", (req, res) => {
  if (req.user) {
    const { _id, username } = req.user;
    res.json({
      _id,
      username,
    });
  } else {
    res.json({ user: null });
  }
});
//below code will log a user out
router.post("/logout", (req, res) => {
  req.logOut();
  res.json("logged out");
});
module.exports = router;
