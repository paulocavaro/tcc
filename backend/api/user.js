const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation //chama as funcoes de validacao la do codigo validation.js, colocado no app pelo consign

    const encryptPassword = senha => { //usa a biblioteca do bcrypt pra criptografar uma senha e retornar o hash gerado e guardar no banco, protegendo os dados do usuario
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
    }

    const save = async (req,res) => { //criando a funcao de salvar um usuario no banco, seja um novo ou editando ele 
        const usuario = {... req.body } // cria um objeto chamado usuario que vai receber os dados transformados pelo body-parser no req.body
        if(req.params.id) usuario.id = req.params.id // se passar algum id por parametro na url, ele pega e adiciona no objeto usuario

        try{ //fazendo as validacoes dos dados
            existsOrError(usuario.nome, 'Nome não informado')
            existsOrError(usuario.email, 'E-mail não informado')
            existsOrError(usuario.senha, 'Senha não informada')
            existsOrError(usuario.confirmSenha, 'Confirmação de Senha inválida')
            equalsOrError(usuario.senha, usuario.confirmSenha,
                'Senhas não conferem')
            
            const usuarioFromDB = await app.db('usuarios') //verifica se existe um email igual ao passado pelo usuario
                .where({email: usuario.email}).first()

            if(!usuario.id){ //caso ele nao tenha passado um id, significa que ele esta tentando criar um novo usuario, pois n existe id para ele
                notExistsOrError(usuarioFromDB,'Email ja cadastrado')// sendo assim, se existir um email no baco, ele retorna a mensagem de error que email ja cadastrado
            }

        } catch(msg){
            return res.status(400).send(msg) //o catch fica encarregado de imprimir esse erro
        }

        usuario.senha = encryptPassword(usuario.senha) //criptografando a senha do usuario
        delete usuario.confirmSenha //deletando a confirmacao de senha, pois n vamos armazena-la no banco

        if(usuario.id){ //se o id existir, significa que ele quer editar o usuario
            app.db('usuarios')
                .update(usuario)
                .where({id:usuario.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else { //se nao existir, ele da um insert desse objeto usuario dentro do banco na tabela de usuarios
            app.db('usuarios')
                .insert(usuario)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req,res) => { //pega todos os usuarios da tabela e retorna num array
        app.db('usuarios')
            .select('id', 'nome', 'email')
            .then(usuario => res.json(usuario))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req,res) => { //pega um usuario especifico 
        app.db('usuarios')
            .select('id', 'nome', 'email')
            .where({id: req.params.id}).first()
            .then(usuario => res.json(usuario))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById }
}