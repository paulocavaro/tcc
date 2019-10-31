module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation //chama as funcoes de validacao la do codigo validation.js, colocado no app pelo consign

    const diaAtual = new Date().getDay() //pega o dia atual. dependendo do dia, ele vai dar de 0-6
    setInterval(() => { // reseta o valor do dia atual a cada 1 minuto
        const diaAtual = new Date().getDay()
    }, 60000)

    const save = async (req,res) => {
        
        const recorrencia = {... req.body }
        //recorrencia.idRemedio = req.params.idRemedio
        idUsuario = req.params.idUsuario
        if(req.params.id) recorrencia.id = req.params.id

        try {
            existsOrError(recorrencia.horaInicio,'Hora de inicio nao informada')
            existsOrError(recorrencia.frequencia,'Frequencia nao informada')
            existsOrError(recorrencia.dia,'Dias nao informados')
            existsOrError(recorrencia.idRemedio,'Informe ID do Remedio')

            if(!recorrencia.id){ 
                const remedioPercenteUsuario = await app.db('remedios')
                    .where({idUsuario: idUsuario,
                        id: recorrencia.idRemedio}).first()
                existsOrError(remedioPercenteUsuario, 'Esse remedio nao pertence ao usuario ou nao existe')
                
                const recorrenciaExistente = await app.db('recorrencias')
                    .where({idRemedio: recorrencia.idRemedio})
                notExistsOrError(recorrenciaExistente,'Esse remedio ja possui recorrencia')
            }
        }        
        catch (msg) {
            return res.status(400).send(msg)
        }

        if(recorrencia.id){
            try{
                const recorrenciaAtualizada = await app.db('recorrencias') // aqui ele coloca os novos dados na recorrencia que ja existe no banco
                    .where({id: recorrencia.id})
                    .update(recorrencia)
                console.log(recorrenciaAtualizada)
                const apagandoHorariosAntigos = await app.db('horarios') // apago todos os horarios referentes a essa recorrencia para isnerir novos horarios
                    .where({idRecorrencia: recorrencia.id}).del()

                if(recorrenciaAtualizada){ //depois que atualizar os dados de recorrencia e apagar os dados dos hoarios antigos
                    const horaInicioInt = parseInt(recorrencia.horaInicio)
                    console.log(horaInicioInt)
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
                        
                        await app.db('horarios')
                        .insert(data)
                        // .then(() => {})  
                        // .catch(err => {})
                        
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
                        
                        await app.db('horarios')
                        .insert(data)
                        // .then(() => console.log('fazendo'))  
                        // .catch(err => console.log('ta dando erro'+err))
                    }                        
                }
                res.status(204).send()
            }
            catch(e){
                res.status(500).send()
            }
            
        }
    }

    const getByRemedios = async (req,res) => {

        const remedios = await app.db('remedios')
            .where({idUsuario: req.params.idUsuario})
        
        const recorrencias = []
        for(let i=0;i<remedios.length;i++){
            const recorrencia = await app.db('recorrencias')
                .where({idRemedio: remedios[i].id})
            if(Object.keys(recorrencia).length !== 0){
                recorrencias.push(recorrencia[0])
            } 
        }
        res.json(recorrencias)
    }

    const remove = async (req,res) => {
        try{
            const diasDeletados = await app.db('horarios')
            .where({idRecorrencia: req.params.id}).del()

            const recorrenciaDeletada = await app.db('recorrencias')
            .where({id: req.params.id}).del()
            existsOrError(recorrenciaDeletada,'Recorrencia nao existe')

            res.status(204).send()
        }catch(msg){
            res.status(500).send(msg)
        }
    }

    return { save, getByRemedios, remove }
}