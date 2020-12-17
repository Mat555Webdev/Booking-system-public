module.exports = app => {
    let booking = require('../controllers/booking.controller')
    app.put('/viewbooking', booking.viewbookings)
}