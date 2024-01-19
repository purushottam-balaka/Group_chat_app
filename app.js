const express=require('express')

const app=express();

const router=require('./routes/routes');

const bodyParser=require('body-parser');

const db=require('./util/database')

const users=require('./model/users');

const messages=require('./model/messages');

const cors=require('cors');

const alert=require('alert')

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}))

app.use(router);

app.use(express.static('views'));

db.sync();

users.hasMany(messages);
messages.belongsTo(users);

app.listen(9000,()=>{
    console.log('Running on Port 9000');
});