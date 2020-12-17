module.exports = app => {
    let booking = require('../controllers/booking.controller')
    app.post('/makebooking', booking.makebooking)
}