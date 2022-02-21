const express=require('express');
const path=require('path');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const adminModel=require('../models/adminModel');

//admin login page controller.
exports.AdminLogin=(req,res)=>{
    res.render('admin/login',{
        title: "Admin | Login",
        data: req.admin
    })
}

//admin login store data controller.
exports.addAdminLogin=(req,res)=>{
    adminModel.findOne({
        adminEmail:req.body.email
    }, (err,data)=>{
        if(data){
            if(data.status){
                const hashpwd=data.adminPassword;
                if(bcrypt.compareSync(req.body.password, hashpwd)) {
                    const token=jwt.sign({
                        id:data._id,
                        username:data.adminName,
                        email:data.adminEmail
                    },'mitra123',{expiresIn:'3m'});
                    res.cookie('adminToken',token);
                    console.log(data);
                    res.redirect('/admin/admin-dashboard');
                }else{
                    console.log('Password does not match...');
                    res.redirect('/admin');
                }
            }else{
                console.log('Status false...');
                res.redirect('/admin');
            }
        }else{
            console.log('Admin name does not exist...');
            res.redirect('/admin');
        }
    })
}

//adminAuth middleware controller.
exports.adminAuth=(req,res,next)=>{
    if(req.admin){
        console.log(req.admin);
        next();
    }else{
        console.log(req.admin,'err');
        res.redirect('/admin')
    }
}

//admin register page controller.
exports.AdminRegister = (req, res) => {
    res.render("admin/register", {
        title: "Admin | Register",
        data: req.admin,
        // message: req.flash("message"),
        // alert: req.flash("alert")
    })
}

//admin register store data controller
exports.addAdminRegister=(req,res)=>{
    adminModel({
        adminName: req.body.username,
        adminEmail: req.body.email,
        adminPassword: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save().then(result => {
        console.log("Admin added....");
        res.redirect('/admin/show-admin-register')
    }).catch(err => {
        console.log(err, "error while add admin");
    })
}

//dashboard page controller.
exports.dashboard=(req, res)=>{
    res.render("admin/dashboard",{
        title: "Admin | Dashborad",
        data: req.admin
    })
}

//logout controller.
exports.logout=(req,res)=>{
    res.clearCookie('adminToken');
    res.redirect('/admin')
}