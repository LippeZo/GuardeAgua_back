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

servidor.post('/login', async function(req, res) {
    try {
        const user = await Usuario.findOne({ where: { email: req.body.email } });
        if (user) {
            const match = await byrypt.compare(req.body.senha, user.senha);
            if (match) {
                console.log('usuário encontrado no banco de dados');
                res.status(200).send('Usuário encontrado e senha correta');
            } else {
                res.status(401).send('Senha incorreta');
            }
        } else {
            res.status(404).send('Usuário não encontrado');
        }
    } catch (error) {
        console.error("ERRO AO PROCURAR USUÁRIO: " + error);
        res.status(500).send('Erro ao procurar usuário');
    }
});


servidor.listen(PORT,HOST,()=>{
    console.log('Servidor criado com sucesso')
});
