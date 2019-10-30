module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation //chama as funcoes de validacao la do codigo validation.js, colocado no app pelo consign

    const diaAtual = new Date().getDay() //pega o dia atual. dependendo do dia, ele vai dar de 0-6
    setInterval(() => { // reseta o valor do dia atual a cada 1 minuto
        const diaAtual = new Date().getDay()
    }, 60000)

    const save = async (req,res) => {
        
        const recorrencia = {... req.body }
        recorrencia.idRemedio = req.params.idRemedio
        if(req.params.id) recorrencia.id = req.params.id

        try {
            existsOrError(recorrencia.horaInicio,'Hora de inicio nao informada')
            existsOrError(recorrencia.frequencia,'Frequencia nao informada')
            existsOrError(recorrencia.dia,'Dias nao informados')
        }        
        catch (msg) {
            return res.status(400).send(msg)
        }

        if(recorrencia.id){
            try{
                const recorrenciaAtualizada = await app.db('recorrencias') // aqui ele coloca os novos dados na recorrencia que ja existe no banco
                    .where({id: recorrencia.id})
                    .update(recorrencia)
 
                const apagandoHorariosAntigos = await app.db('horarios') // apago todos os horarios referentes a essa recorrencia para isnerir novos horarios
                    .where({idRecorrencia: recorrencia.id}).del()

                if(recorrenciaAtualizada){ //depois que atualizar os dados de recorrencia e apagar os dados dos hoarios antigos
                    
                    // const rec = await app.db('recorrencias') //pega o dado da recorrencia atualizada
                    //     .select('horaInicio','frequencia')
                    //     .where({id: recorrencia.id})
                    //     .first()    NAO PRECISA DESSA PARTE, JA QUE OS DADOS JA TAO NA VARIAVEL recorrencia QUE ESTAMOS USANDO PARA ATUALIZAR
                    const horaInicioInt = parseInt(recorrencia.horaInicio)
                    for(var i=horaInicioInt ; i<(horaInicioInt+24) ; i+=recorrencia.frequencia){
                        //faz um for pra pegar do horario de inicio ate o outro dia, completando 24h
                        var hora = i
                        if (hora>24){
                            hora = hora - 24
                        }
                        
                        const data = {
                            idRecorrencia: recorrencia.id,
                            horario: ""+hora
                        }
                        
                        app.db('horarios')
                        .insert(data)
                        .then(() => console.log('fazendo'))  
                        .catch(err => console.log('ta dando erro'+err))
                        
                    }                        
                }
                res.status(204).send()
            }
            catch(e){
                res.status(500).send()
            }
        }
        else {
            try{
                const novoId = 0; //Essa variavel, posteriormente, vai guardar o valor do ID da nova recorrencia
                const recorrenciaInserida = await app.db('recorrencias')
                    .insert(recorrencia)
                    .returning('id')
                    .then(id => this.novoId = id[0])
                    
                const horaInicioInt = parseInt(recorrencia.horaInicio)
                if(recorrenciaInserida){
                    for(var i=horaInicioInt ; i<(horaInicioInt+24) ; i+=recorrencia.frequencia){
                        //faz um for pra pegar do horario de inicio ate o outro dia, completando 24h
                        var hora = i
                        if (hora>24){
                            hora = hora - 24
                        }
                        
                        const data = {
                            idRecorrencia: this.novoId,
                            horario: ""+hora
                        }
                        
                        app.db('horarios')
                        .insert(data)
                        .then(() => console.log('fazendo'))  
                        .catch(err => console.log('ta dando erro'+err))
                    }                        
                }
                res.status(204).send()
            }
            catch(e){
                res.status(500).send()
            }
            
        }
    }

    const getByRemedio = async (req,res) => {
        const recorrencias = await app.db('recorrencias')
            .select('id','horaInicio', 'frequencia', 'dia')
            .where({idRemedio: req.params.idRemedio}).first()
        console.log(recorrencias)

        

        res.status(200).send()
        
    }

    return { save, getByRemedio }
}