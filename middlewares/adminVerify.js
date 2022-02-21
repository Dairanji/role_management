const adminModel = require('../models/adminModel');

exports.verifyAdmin = (req, res, next) => {
    adminModel.findOne({
        adminName: req.body.username
    }).exec((err, admin) => {
        if (err) {
            console.log(err, "Error while find username in middleware");
            return;
        }
        if (admin) {
            console.log("Admin name already exists");
            return;
        }
        adminModel.findOne({
            adminEmail: req.body.email
        }).exec((err,email)=>{
            if (err) {
                console.log((err,"Error while find admin name in middleware"));
                return;
            }
            if (email) {
                console.log(("Email already exists"));
                return res.redirect('/admin/show-admin-register');
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