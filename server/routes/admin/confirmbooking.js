module.exports = app => {
    let admin = require("../../controllers/admin.controller")
    app.put('/admin/confirmbooking', admin.confirmbooking)
}