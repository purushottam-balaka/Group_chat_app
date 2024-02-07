const users=require('../model/users')
const groups=require('../model/groups')
const messages=require('../model/messages')
const op=require('sequelize').Op
const Sequelize=require('sequelize');
const userGroups=require('../model/userGroups')

exports.reqUsers=async(req,res,next)=>{
    try{
        const grpName=req.body.name;
        console.log('grp',req.body)
        await groups.create({
            group_name:grpName,
        })

        const gId=await groups.findOne({where:{group_name:grpName}})
        await userGroups.create({
            userId:req.user.id,
            groupId:gId.id,
        })
        const uId=req.user.id;
        const urs=await users.findAll({where:{id:{[op.ne]:uId}}});
        return res.status(200).json({urs:urs,gId:gId});
    }catch(err){
        console.log(err)
    }
  
}

exports.addUser=async(req,res,next)=>{
    try{
        //console.log('add',req.body)
        const gId=req.body.gId.id;
        const id=req.body.id;
        // await groups.create({
        //     group_name:grpName,
        //     userId:id,
        // })
        await userGroups.create({
            userId:id,
            groupId:gId,
        })
        return res.status(200).json();
    }catch(err){
        console.log(err)
    }
}

exports.getGroups=async(req,res,next)=>{
    try{
        const grp=await groups.findAll()    
            return res.status(200).json({groups:grp})
    }catch(err){
        console.log(err)
    }
}

exports.groupMsgs=async(req,res,next)=>{
    try{
        console.log('group msgs',req.body)
        const gId=req.body.gId;
        const grpMsgs=await messages.findAll({where:{groupId:gId}})
            return res.status(200).json({grpMsgs:grpMsgs});
    }catch(err){
        console.log(err)
    }
}