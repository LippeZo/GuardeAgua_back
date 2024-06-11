express = require('express')
servidor = express();

const HOST = '192.168.0.77';
const PORT = 3000;

const byrypt = require('bcrypt')

const sequelize = require('./db')
const Usuario = require('./usuario')

servidor.use(express.json());
servidor.use(express.urlencoded({extended: true}));



servidor.get("/",function(req,res){
    res.send('Bem vindo ao Servidor!');
})

servidor.post('/cadastrar_usuario',async function(req,res){
    try{
        console.log('tentativa de criação usuario');
        const hashePassowrd = await byrypt.hash(req.body.senha,10);
        await sequelize.sync();
        const novoUsuario = await Usuario.create({
            tipoUsuario: req.body.tipoUsuario,
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            cpf: req.body.cpf,
            email: req.body.email,
            estado: req.body.estado,
            cidade: req.body.cidade,
            senha: hashePassowrd
        },
        res.status(200).send('usuario criado!')
    )
    }catch(error){
        console.error("ERRO AO CRIAR USUARIO:"+error);
        res.status(500).send('erro ao criar usuário');
    }

})

servidor.post('/login',async function(req,res){
    Usuario.findOne({where:{nome:req.body.nome}}).then(user => {
        if(user){
            console.log()
        }
    })});


servidor.listen(PORT,HOST,()=>{
    console.log('Servidor criado com sucesso')
});
