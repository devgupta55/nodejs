const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    //combination of product and id of the 
    //cart in which the product lies and 
    //the quantity
    quantity: Sequelize.INTEGER
});

module.exports = CartItem;
