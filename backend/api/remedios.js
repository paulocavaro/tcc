module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation //chama as funcoes de validacao la do codigo validation.js, colocado no app pelo consign

    const save = async (req,res) => {
        const remedio = {...req.body }
        remedio.idUsuario = req.params.idUsuario
        remedio.idModulo = req.params.idModulo
        if(req.params.id) remedio.id = req.params.id

        try{
            existsOrError(remedio.nome, "Nome nao informado")
            existsOrError(remedio.estoque, "Estoque nao informado")
            existsOrError(remedio.posicao, "Posicao nao informada")
        }
        catch(msg) {
            return res.status(400).send(msg)
        }

        if (remedio.id){
            app.db('remedios')
                .update(remedio)
                .where( {id: remedio.id})
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('remedios')
                .insert(remedio)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req,res) => {
        app.db('remedios')
            .select('id','nome','estoque','posicao','idUsuario','idModulo')
            .then(remedio => res.json(remedio))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req,res) => {
        app.db('remedios')
            .select('id','nome','estoque','posicao','idUsuario','idModulo')
            .where({id: req.params.id}).first()
            .then(remedio => res.json(remedio))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req,res) => {
        app.db('remedios')
            .delete()
    }

    return { save, get, getById, remove }
}