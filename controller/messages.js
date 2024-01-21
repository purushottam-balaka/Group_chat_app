const users=require('../model/users');
const messages=require('../model/messages');
const {Op}=require('sequelize')

exports.addMessage=async(req,res,next)=>{
    try{
        const message=req.body.message;
        await messages.create({
            message:message,
            name:req.user.name,
            userId:req.user.id,
        })
        return res.status(201).json({success:true});
    }catch(err){
        console.log(err)
    }
    
}

exports.getMessage=async(req,res,next)=>{
    try{
    const lastId=req.body.lastId || 0;
    console.log('lastid',lastId)
    const msg=await messages.findAll({
        where:{id:{[Op.gt]:lastId}},
        attributes:['id','name','message'],
    }) 
    if(msg==[]){
        return res.status(200)
    }
    else{
        return res.status(201).json({msg:msg});
        }
        
    }catch(err){
        console.log(err)
    }

}