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

    await messages.findAll({
        order:[['id','ASC']],
        include:[{
            model:users,
            required:true,
        }]
    })
    .then((msg)=>{
        return res.status(201).json({msg:msg});
        // console.log(msg)
    })
    .catch((err)=>{
        console.log(err);
    })
}