const express=require('express');

const router=express.Router();

const controller=require('../controller/controller')

router.get('/',controller.home);

router.post('/signup',controller.signup);

module.exports=router;