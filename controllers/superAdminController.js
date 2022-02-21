const express=require('express');
const path=require('path');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const superModel=require('../models/superAdminModel');


//super admin login page controller.
exports.login=(req,res)=>{
    res.render('superadmin/login',{
        title: "Super Admin | Login",
        data: req.superadmin
    })
}

//login store data controller.
exports.addLogin=(req,res)=>{
    superModel.findOne({
        superAdminEmail:req.body.email
    }, (err,data)=>{
        if(data){
            if(data.status){
                const hashpwd=data.superAdminPassword;
                if(bcrypt.compareSync(req.body.password, hashpwd)) {
                    const token=jwt.sign({
                        id:data._id,
                        username:data.superAdminName,
                        email:data.superAdminEmail
                    },'mitra123',{expiresIn:'3m'});
                    res.cookie('superToken',token);
                    console.log(data);
                    res.redirect('/super/dashboard');
                }else{
                    console.log('Password does not match...');
                    res.redirect('/super');
                }
            }else{
                console.log('Status false...');
                res.redirect('/super');
            }
        }else{
            console.log('Username does not exist...');
            res.redirect('/super');
        }
    })
}

//adminAuth middleware controller.
exports.superAuth=(req,res,next)=>{
    if(req.superadmin){
        console.log(req.superadmin);
        next();
    }else{
        console.log(req.superadmin,'err');
        res.redirect('/super')
    }
}

//super admin register page controller.
exports.register = (req, res) => {
    res.render("superadmin/register", {
        title: "Super Admin | Register",
        data: req.superadmin,
        // message: req.flash("message"),
        // alert: req.flash("alert")
    })
}

//super admin register store data controller
exports.addRegister=(req,res)=>{
    superModel({
        superAdminName: req.body.username,
        superAdminEmail: req.body.email,
        superAdminPassword: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save().then(result => {
        console.log("Super admin added....");
        res.redirect('/super/show-register')
    }).catch(err => {
        console.log(err, "error while add super admin");
    })
}

//dashboard page controller.
exports.dashboard=(req, res)=>{
    res.render("superadmin/dashboard",{
        title: "Super Admin | Dashborad",
        data: req.superadmin
    })
}

//logout controller.
exports.logout=(req,res)=>{
    res.clearCookie('superToken');
    res.redirect('/super')
}