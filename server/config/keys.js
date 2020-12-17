//this document is going to contain all sensistive data that
//the application needs to run such as mongo string, session 
//cookie key etc.
 
module.exports = {
    google:{
        clientID:"",
        clientSecret:"",
        callbackURL: ""
    },
    github:{
        clientID: "",
        clientSecret: "",
        callbackURL: ""
    },
    mongoDB:{
        localDB:"mongodb://127.0.0.1:27017/booking-system",
        dbURI: ""
    },
    session:{
        cookieKey: "kdjkjdskljdskljdkljs"
    }
}

