const Sequelize = require('sequelize');
const dataBase = require('./db');

const usuario = dataBase.define('usuario',{
    tipoUsuario:{
        type: Sequelize.STRING
    },
    nome :{
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    cpf:{
        type: Sequelize.STRING
    },
    email :{
        type : Sequelize.STRING
    },
    estado:{
        type: Sequelize.STRING
    },
    cidade:{
        type: Sequelize.STRING
    },
    senha: {
        type: Sequelize.STRING
    }
})

module.exports = usuario;