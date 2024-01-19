const Sequelize=require('sequelize');

const sequelize=new Sequelize('group_chat','root','ASDF12345@a',{
    dialect:'mysql',
    host:'localhost',
});
module.exports=sequelize;