const sequelize = require('sequelize');

const db = new sequelize({
    dialect: "sqlite",
    storage: __dirname + '/content.db',
})

const Users = db.define('user' , {
    id:{
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },

    privilage:{
        type: sequelize.STRING,
        allowNull: false,
    },
    accessRed:{
        type: sequelize.BOOLEAN,
        allowNull: false,

    },
    email:{
        type: sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: sequelize.STRING,
        allowNull: false,
    }
})



module.exports = {
    db,Users
}