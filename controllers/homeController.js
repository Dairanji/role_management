const express=require('express');
const path=require('path');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const userModel=require('../models/userModel');


//login page controller.
exports.login=(req,res)=>{
    res.render('login',{
        title: "User | Login",
        data: req.user
    })
}

//login store data controller.
exports.addLogin=(req,res)=>{
    userModel.findOne({
        userEmail:req.body.email
    }, (err,data)=>{
        if(data){
            if(data.status){
                const hashpwd=data.userPassword;
                if(bcrypt.compareSync(req.body.password, hashpwd)) {
                    const token=jwt.sign({
                        id:data._id,
                        username:data.userName,
                        email:data.userEmail
                    },'mitra123',{expiresIn:'3m'});
                    res.cookie('userToken',token);
                    res.redirect('/dashboard');
                }else{
                    console.log('Password does not match...');
                    res.redirect('/');
                }
            }else{
                console.log('Status false...');
                res.redirect('/');
            }
        }else{
            console.log('Username does not exist...');
            res.redirect('/');
        }
    })
}

//userAuth middleware controller.
exports.userAuth=(req,res,next)=>{
    if(req.user){
        console.log(req.user);
        next();
    }else{
        console.log(req.user,'err');
        res.redirect('/')
    }
}


//register page controller.
exports.register = (req, res) => {
    res.render("register", {
        title: "User | Register",
        data: req.user,
        // message: req.flash("message"),
        // alert: req.flash("alert")
    })
}

//register store data controller
exports.addRegister=(req,res)=>{
    userModel({
        userName: req.body.username,
        userEmail: req.body.email,
        userPassword: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save().then(result => {
        console.log("User added....");
        res.redirect('/show-register')
    }).catch(err => {
        console.log(err, "error while add user");
    })
}

//dashboard page controller.
exports.dashboard=(req, res)=>{
    res.render("dashboard",{
        title: "User | Dashborad",
        data: req.user
    })
}

//logout controller.
exports.logout=(req,res)=>{
    res.clearCookie('userToken');
    res.redirect('/')
}