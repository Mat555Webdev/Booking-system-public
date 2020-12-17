module.exports = app => {
    let admin = require("../../controllers/admin.controller")
    app.delete('/admin/deleteUser', admin.deleteuser)
}