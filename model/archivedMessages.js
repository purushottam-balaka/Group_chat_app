const sequelize=require('sequelize');

const db=require('../util/database');

const archivedMessages=db.define('messages',{
    id:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:sequelize.STRING,
        allowNull:false,
    },
    message:{
        type:sequelize.STRING,
        allowNull:false,
    }

})

module.exports=archivedMessages;