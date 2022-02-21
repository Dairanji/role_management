const superModel = require('../models/superAdminModel');

exports.verifySuper = (req, res, next) => {
    superModel.findOne({
        superAdminName: req.body.username
    }).exec((err, user) => {
        if (err) {
            console.log(err, "Error while find super admin in middleware");
            return;
        }
        if (user) {
            console.log("Super admin name already exists");
            return;
        }
        superModel.findOne({
            superAdminEmail: req.body.email
        }).exec((err,email)=>{
            if (err) {
                console.log((err,"Error while find super admin name in middleware"));
                return;
            }
            if (email) {
                console.log(("Email already exists"));
                return res.redirect('/super/show-register');
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