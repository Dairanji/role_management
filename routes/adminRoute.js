const express=require('express');
const Route=express.Router();
const adminController=require('../controllers/adminController');
const adminVerify=require('../middlewares/adminVerify');

Route.get('/',adminController.AdminLogin);
Route.post('/admin-login',adminController.addAdminLogin);
Route.get('/show-admin-register',adminController.AdminRegister);
Route.post('/admin-register',[adminVerify.verifyAdmin],adminController.addAdminRegister); //submit data
Route.get('/admin-dashboard',adminController.adminAuth,adminController.dashboard);
Route.get('/logout',adminController.logout);

module.exports=Route