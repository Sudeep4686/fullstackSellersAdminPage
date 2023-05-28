const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Product = sequelize.define('product',{
    id:{
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull : false,
        primaryKey: true
    },
    name : {
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    }
});

module.exports = Product;