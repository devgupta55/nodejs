const Sequelize = require('sequelize'); //considering it as a class

const sequelize = new Sequelize('node_complete', 'root', 'devgupta55', {
    dialect: 'mysql', 
    host: 'localhost'
}); //making an instance calling Sequilize constructor

module.exports = sequelize;
