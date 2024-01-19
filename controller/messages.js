const users=require('../model/users');
const messages=require('../model/messages');

exports.addMessage=async(req,res,next)=>{
    try{
        const message=req.body.message;
        await messages.create({
            message:message,
            userId:req.user.id,
        })
        return res.status(201).json({success:true});
    }catch(err){
        console.log(err)
    }
    
}

exports.getMessage=async(req,res,next)=>{
    const msg=await messages.findAll()
    return res.status(200).json({msg:msg});
}