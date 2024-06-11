const Sequelize = require('sequelize');
const sequelize = new Sequelize('usuarios','root','32289922',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;