const bcrypt=require('bcrypt');
const users=require('../model/users');
const alert=require('alert')

exports.home=(req,res)=>{
    res.sendFile(process.cwd()+'/views/login.html');
}

exports.signup=async(req,res,next)=>{
    try{
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
        const phone=req.body.phone;
        const uniqueMail=await users.findAll({where:{email:email}});
        if(uniqueMail.length!=0){
            res.status(200).json({message:'User already existed'});
        }
        else{
            const saltRounds=10;
            bcrypt.hash(password,saltRounds, async(err,ecyPass)=>{
                //console.log('pass',ecyPass)
                if(err){
                    console.log(err)
                    return res.status(400).json({message:'Something went wrong'})
                    }
                else{
                    await users.create({
                        name:name,
                        email:email,
                        password:ecyPass,
                        phone_number:phone,
                    });
                    return res.status(201).json({message:'New user created successfully.'});
                }
            })
        }

    }catch(err){
        console.log(err)
    }
    

}

exports.login=async(req,res,next)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;

        const uniqueMail=await users.findAll({where:{email:email}})
        if(uniqueMail.length!=0){
            bcrypt.compare(password,uniqueMail[0].password, (err,result)=>{
                if(err)
                    res.json({message:"Something went wrong"});
                else if(result==true){
                    res.status(200).json({message:"User logedin succssfully"})
                }else{
                    res.json({message:"You have entered wrong password"})
                }
            })
        }
    }catch(err){
        console.log(err)
    }
   

}