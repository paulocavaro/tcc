module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation //chama as funcoes de validacao la do codigo validation.js, colocado no app pelo consign
    const mqtt = require('./mqtt')

    async function verifica() {
        const now = new Date()
        const day = now.getDay()
        const hora = now.getHours()
        // pra comparar com minutos
        var min = now.getMinutes()
        if(parseInt(min) < 10){
            min = '0' + min
        }
        const hm = hora + '.' + min // . porque é guardado como um float
        console.log(hm)
        const agora = await app.db('horarios')
            .select('topico','posicao','dia')
            .where({horario: ''+hm})
            .join('recorrencias', {'recorrencias.id': 'horarios.idRecorrencia'})
            .join('remedios', {'remedios.id': 'recorrencias.idRemedio'})
            .join('modulos', {'modulos.id': 'remedios.idModulo'})
            .then(mensagens => {
                mqtt.init().then(resutl => {
                    mensagens.forEach((obj,index) => {
                        if(obj.dia.includes(""+day)){
                            msg = `remedio na posicao ${obj.posicao} e dias: ${obj.dia}`
                            mqtt.publish(obj.topico,msg)
                        }
                    })
                })
            })
        .catch(err => {
          console.log('Ocorreu um erro')
          console.error(err)
        })
      }
      // executa assim que foi aberto:
      verifica()
      // e a partir do próximo minuto,
      setTimeout(() =>
        // executa a cada um minuto
        setInterval(verifica, 60000)
      , (60 - (new Date().getSeconds())) * 1000 
      )

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
                
                const apagandoHorariosAntigos = await app.db('horarios') // apago todos os horarios referentes a essa recorrencia para isnerir novos horarios
                    .where({idRecorrencia: recorrencia.id}).del()

                if(recorrenciaAtualizada){ //depois que atualizar os dados de recorrencia e apagar os dados dos hoarios antigos
                    
                    const converteString = recorrencia.horaInicio.replace(":",".")
                    const horaInicioFloat = parseFloat(converteString)
                    
                    for(var i=horaInicioFloat ; i<(horaInicioFloat+24) ; i+=parseFloat(recorrencia.frequencia)){
                        //faz um for pra pegar do horario de inicio ate o outro dia, completando 24h
                        var hora = i.toFixed(2)
                        if (hora>24){
                            hora = hora - 24
                            hora = hora.toFixed(2)
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
                    
                const converteString = recorrencia.horaInicio.replace(":",".")
                const horaInicioFloat = parseFloat(converteString)
                
                if(recorrenciaInserida){
                    for(var i=horaInicioFloat ; i<(horaInicioFloat+24) ; i+=parseFloat(recorrencia.frequencia)){
                        //faz um for pra pegar do horario de inicio ate o outro dia, completando 24h
                        var hora = i.toFixed(2)
                        if (hora>24){
                            hora = hora - 24
                            hora = hora.toFixed(2)
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
                
            // if(Object.keys(recorrencia).length !== 0){
                if(recorrencia.length!==0){ 
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