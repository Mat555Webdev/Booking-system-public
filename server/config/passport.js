const passport = require("passport");
const GoogleStrat = require("passport-google-oauth20");
const GitHubStrategy = require('passport-github').Strategy;
const LocalStrat = require("passport-local");
const key = require("./keys");
const User = require("../model/user.model");
const bcrypt = require("bcryptjs");

//below code is used to initialise a user using the
//google strategy provided by passport.js
passport.use(
  new GoogleStrat(
    {
      callbackURL: key.google.callbackURL,
      clientID: key.google.clientID,
      clientSecret: key.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(currentUser => {
        //check to see whether the user is already saved to the db
        
        if (currentUser) {
          console.log(currentUser);
          done(null, currentUser);
        } else {
          new User({
            username: profile.displayName,
            googleID: profile.id
          })
            .save()
            .then(newUser => {
              done(null, newUser);
            });
        }
      });
    }
  )
);
//below code will authenticate a user
//using local passport strategy
passport.use(
  new LocalStrat(
    {
      usernameField: "username"
    },
    function(username, password, done) {
      User.findOne({ username }, (err, user) => {
        if (err) {
          console.log("error" + err);
        }
        if (!user) {
          return null, false, { message: "Please verify your details" };
        } else {
          //decrypt the password in the db to see if it matches the password
          //typed in by the user.
          bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
              return done(null, user);
            }
            else{
              res.json("password is incorrect")
            }
          });
        }
      });
    }
  )
);
//code needed to authenticate users using github auth
passport.use(new GitHubStrategy({
  clientID: key.github.clientID,
  clientSecret: key.github.clientSecret,
  callbackURL: key.github.callbackURL
},
function(accessToken, refreshToken, profile, done) {
  User.findOne({ githubID: profile.id }).then(currentUser => {
    //check to see whether the user is already saved to the db
    if (currentUser) {
      done(null, currentUser);
    } else {
      new User({
        username: profile.username,
        githubID: profile.id
      })
        .save()
        .then(newUser => {
          done(null, newUser);
        });
    }
  });
}
));

//code needed to serialize and deserialize a user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
