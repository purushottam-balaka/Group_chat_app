const express=require('express');

const router=express.Router();

const groupsController=require('../controller/groups')

const authentication=require('../middleware/authenticate')

 router.post('/req_users',authentication.authentication,groupsController.reqUsers);

 router.post('/add_user',authentication.authentication,groupsController.addUser);

 router.get('/groups',authentication.authentication,groupsController.getGroups);

 router.post('/group_msgs',groupsController.groupMsgs);

module.exports=router;