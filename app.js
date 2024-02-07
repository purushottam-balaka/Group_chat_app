const express=require('express')

const app=express();

const msg_routes=require('./routes/msg_routes');

const groups_routes=require('./routes/groups');

const bodyParser=require('body-parser');

const db=require('./util/database');

const users=require('./model/users');

const messages=require('./model/messages');

const groups=require('./model/groups');

const userGroups=require('./model/userGroups');

const cors=require('cors');

const alert=require('alert')

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
groups.belongsToMany(users,{  through:userGroups });

groups.hasMany(messages);
messages.belongsTo(groups);

app.listen(9000,()=>{
    console.log('Running on Port 9000');
});