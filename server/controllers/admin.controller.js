//the code in this file is going to handle 
//all requests made by the admin user
const user = require("../model/user.model");
const booking = require("../model/booking.model");

//below code will allow the admin user to view all users
module.exports.viewusers = (req, res) => {
  if (req.user.username === "admin") {
    user.find((err, data) => {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        res.json(data);
      }
    });
  } else {
    res.status(500);
  }
};

//below code will allow the admin to view all bookings made
//by a specific user
module.exports.viewbookingsforuser = (req, res) => {
  if (req.user.username === "admin") {
    booking.find({ username: req.body.username }, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        res.json(data);
      }
    });
  } else {
    res.status(500);
  }
};

//below code will allow the admin user to confirm a booking for a user
module.exports.confirmbooking = (req, res) => {
  if (req.user.username === "admin") {
    const { id, room, dates, price, accepted, rejected } = req.body;
    booking.findOneAndUpdate(
      { _id: id },
      {
        room,
        dates,
        price,
        pending: false,
        accepted,
        rejected
      },
      { new: true },
      (err, data) => {
        if (err) {
          console.log(err);
          res.send("not updated");
        } else res.json("updated");
      }
    );
  } else res.status(500);
};

module.exports.deleteuser = (req, res) => {
  let id = req.body.id
    user.findOneAndDelete({_id: id}, (err) => {
        if(err){
            res.send(`Could not delete with error: ${err}`)
        } else{
            res.json("user deleted")
        }
    })
}
