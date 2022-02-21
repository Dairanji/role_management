const userModel = require('../models/userModel');

exports.verifyUser = (req, res, next) => {
    userModel.findOne({
        userName: req.body.username
    }).exec((err, user) => {
        if (err) {
            console.log(err, "Error while find username in middleware");
            return;
        }
        if (user) {
            console.log("Username already exists");
            return;
        }
        userModel.findOne({
            userEmail: req.body.email
        }).exec((err,email)=>{
            if (err) {
                console.log((err,"Error while find username in middleware"));
                return;
            }
            if (email) {
                console.log(("Email already exists"));
                return res.redirect('/show-register');
            }
        })
        const password = req.body.password;
        const confirm = req.body.confirmPassword;
        if (password !== confirm) {
            console.log("password and confirm password doesn't match");
            return;
        }
        next();
    })
}