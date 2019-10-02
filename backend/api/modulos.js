const mqtt = require('./mqtt.js')
module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation //chama as funcoes de validacao la do codigo validation.js, colocado no app pelo consign

    const save = async (req,res) => {

        const modulo = {... req.body }
        modulo.idUsuario = req.params.idUsuario
        if(req.params.id) modulo.id = req.params.id

        try {
            existsOrError(modulo.nome, 'Nome não informado')

            const nomeFromDB = await app.db('modulos')
                .where({nome: modulo.nome}).first()
            
            if(!modulo.id){
                notExistsOrError(nomeFromDB,'Nome ja em uso')
            }
        }
        catch(msg){
            return res.status(400).send(msg)
        }

        modulo.topico = "comando"+modulo.nome
        modulo.topicoRetorno = "retorno"+modulo.nome

        if(modulo.id){
            app.db('modulos')
                .update(modulo)
                .where({id: modulo.id})
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('modulos')
                .insert(modulo)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req,res) => {
       app.db('modulos')
            .select('id','nome','topico','topicoRetorno','idUsuario')
            .then(modulo => res.json(modulo))
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