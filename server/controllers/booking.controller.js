//code in this file is going to handle all requests to
//perform crud operations for bookings
const booking = require("../model/booking.model");

//below code will create a new booking
module.exports.makebooking = (req, res) => {
  //destructure body of ease of access
  const {userID, room, dates, price} = req.body;
  let newbooking = new booking({
    userID,
    room,
    dates,
    price,
    pending: true,
    accepted:false,
    rejected:false
  });
  newbooking.save((err, data) => {
    if (err) {
      res.status(500);
      res.send("error while creating the booking");
    } else {
      console.log(data);
      res.send("Booking saved");
    }
  });
};

//below code will allow a user to view all bookings stored in the db
module.exports.viewbookings = (req, res) => {
    booking.find({userID: req.body.userID}, (err, data) => {
        if(err){
            console.log(err)
            res.status(500);
        }else{
            res.json(data)
        }
    })
}

//below code will delete a booking when a user cancels the booking
module.exports.deletebooking = (req, res) => {
    let id = req.body.id
    booking.findOneAndDelete({_id: id}, (err) => {
        if(err){
            res.send(`Could not delete with error: ${err}`)
        } else{
            res.send("booking deleted")
        }
    })
}
