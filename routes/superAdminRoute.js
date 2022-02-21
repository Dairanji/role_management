const express=require('express');
const Route=express.Router();
const superController=require('../controllers/superAdminController');
const superVerify=require('../middlewares/superVerify');

Route.get('/',superController.login);
Route.post('/add-login',superController.addLogin);
Route.get('/show-register',superController.register);
Route.post('/add-register',[superVerify.verifySuper],superController.addRegister); //submit data
Route.get('/dashboard',superController.superAuth,superController.dashboard);
Route.get('/logout',superController.logout);


module.exports=Route
