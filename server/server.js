//express server
//first we require both next and express
const express = require("express");
const helmet = require("helmet");
const next = require("next");

//pass in a boolean value that will detect
//whether next should start up in dev mode
//or not
const dev = process.env.NODE_ENV !== "production";
const nextapp = next({ dev });
const handle = nextapp.getRequestHandler();
const mongoose = require("mongoose");
const keys = require("./config/keys");

//establish connection to the db
mongoose.connect(keys.mongoDB.localDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", () => {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});
mongoose.connection.once("open", () => {
  console.log("Successfully connected to the database");
});

//our next app is prepared
nextapp
  .prepare()
  //after out next app is prepared, an instance of our express
  //server is created using a promise.
  .then(() => {
    const app = express();
    const PORT = process.env.PORT || 3000;
    const bodyParser = require("body-parser");
    const passport = require("passport");
    const authroutes = require("./routes/auth");
    const cookieSession = require("cookie-session");
    const passportSetup = require("./config/passport");

    //security
    //Default security used with hemeltjs
    app.use(helmet());

    //below code will only allow code that has been written inside
    //the app to be allow by using helmets content security policy.
    //this feature will stop hackers from injecting evil code into
    //the app, it will allow code from this app
    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'", "'unsafe-inline'"]
        }
      })
    );

    //code below will not allow hackers to see where users are coming from
    app.use(helmet.referrerPolicy({ policy: "same-origin" }));

    //bodyparser middleware included, so we
    //can access the body object from this server
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //set the maximum age (how long the cookie will last)
    //of the cookiein milliseconds and specify a cookie key
    //(which is a random set of charactersthat will be used to encode the cookie)
    app.use(
      cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey]
      })
    );

    //passport must be initialised
    app.use(passport.initialize());
    app.use(passport.session());

    //routes below, please note that in order for google
    //for authentication to work, the auth routes must be declared
    //above the "app.get('*')" found underneath this code.
    app.use(authroutes);
    //user routes below
    require("./routes/makeBooking")(app);
    require("./routes/viewBooking")(app);
    require("./routes/deleteBooking")(app);
    //admin routes below
    require("./routes/admin/deleteuser")(app);
    require("./routes/admin/viewusers")(app);
    require("./routes/admin/viewbookings")(app);
    require("./routes/admin/confirmbooking")(app);

    //code below is needed for next.js routes to work, must be underneath routes
    app.get("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(PORT, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
