const express=require('express');

const { createServer } = require("http");
const { Server } = require("socket.io");

const app=express();

const { CronJob } =require('cron') ;

const msg_routes=require('./routes/msg_routes');

const groups_routes=require('./routes/groups');

const bodyParser=require('body-parser');

const db=require('./util/database');

const users=require('./model/users');

const messages=require('./model/messages');

const groups=require('./model/groups');

const userGroups=require('./model/userGroups');

const archivedMessages=require('./model/archivedMessages');

require('dotenv');

const cors=require('cors');

const {op}=require('sequelize');

const alert=require('alert');
const UserGroups = require('./model/userGroups');

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}))

app.use(msg_routes);

app.use(groups_routes);

app.use(express.static('views'));

db.sync();

users.hasMany(messages);
messages.belongsTo(users);

users.belongsToMany(groups,{ through:userGroups });
groups.belongsToMany(users,{ through:userGroups });
UserGroups.belongsTo(groups)
userGroups.belongsTo(users);

groups.hasMany(messages);
messages.belongsTo(groups);

const job = new CronJob(
	'0 0 * * * *', // cronTime
	async function () {
		try{
                const dt=new Date();
                const arcRec= await messages.findAll({
                    where:{
                        createdAt:{
                            [op.lt]:dt.setDate(dt.getDate() - 1)
                        }
                        }})
                if (arcRec.length>0){
                    arcRec.map(async  rowdata =>{
                            await archivedMessages.create({
                            id:rowdata.id,
                            name:rowdata.name,
                            message:rowdata.message,
                            groupId:rowdata.groupId
                        })
                    })
                }
                await messages.destroy({
                    where:{
                        createdAt:{
                            [op.lt]:dt.setDate(dt.getDate() - 1)
                        }
                        }})
        }catch(err){
            console.log(err)
        }
	}, // onTick
	null, // onComplete
	true, // start
	'America/Los_Angeles' // timeZone
);

const server=app.listen(9000)
const io = new Server(server);
  
io.on("connection",(socket)=>{
    // console.log('socket id',socket.id)
    socket.on('chatmsg',(msg)=>{
        io.emit('chatmsg',msg)
    })
});
