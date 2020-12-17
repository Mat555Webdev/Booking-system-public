module.exports = app => {
    let booking = require('../controllers/booking.controller')
    app.delete('/deletebooking', booking.deletebooking)
}