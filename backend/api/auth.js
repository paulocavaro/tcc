const { authSecret } = require('../.env') //onde esta guardado a senha pra criar o token
const jwt = require('jwt-simple') //biblioteca pra criacao de tokens
const bcrypt = require('bcrypt-nodejs') //criptografar ou descriptografar a senha do usuario

module.exports = app => {
    const signin = async (req,res) => {
        if(!req.body.email || !req.body.password) { //ver se chegou email e senha pelo body da requisicao
            return res.status(400).send('Informe email e senha')
        }
        
        const usuario = await app.db('usuarios') //pega o usuario correspondente ao email enviado
            .where({ email: req.body.email })
            .first()
        
        if(!usuario) return res.status(400).send('Usuário não encontrado!') //verifica se esse usuario realmente existe

        const isMatch = bcrypt.compareSync(req.body.password, usuario.senha) //compara se a senha passada eh igual a senha do usuario no banco
        //Lembrando que nao da pra fazer uma comparacao normal, ja que o que temos guardados no banco eh o hash feito pelo proprio bcrypt, entao usamos
        //uma propria funcao do bcrypt para comparar a senha
        if (!isMatch) return res.status(401).send('Email/Senha inválidos!')

        const now = Math.floor(Date.now() / 1000) //Date.now() me da os milisegundos desde primeiro de janeiro de 1970, entao dividindo por 1000 me da os segundos

        const payload = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            iat: now, //iat significa issuead at (emitido em) que eh quando o token foi gerado
            exp: now + (60 * 60 * 24 * 100) //data de expiracao eh 60 segundos * 60 * 24, da um total de 1 dia a partir do IAT
        }

        res.json ({ //responde com um json contendo o bojeto payload, com os dados do usuario juntamente com o iat e o exp, e o token
                    //usando a bilioteca jwt, gera-se o token com o payload e o authSecret impportado do arquivo .env
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req,res) => {
        const userData = req.body || null
        try {
            const token = jwt.decode(userData.token, authSecret)
            if(new Date(token.exp * 1000) > new Date()) {
                return res.send(true)
            }
        } catch (e) {
            //problema com o toke
        }
        res.send(false)
    }

    return { signin, validateToken }
}

