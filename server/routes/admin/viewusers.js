module.exports = app => {
    let admin = require('../../controllers/admin.controller')
    app.get('/admin/viewusers', admin.viewusers)
}