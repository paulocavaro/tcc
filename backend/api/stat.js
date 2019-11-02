module.exports = app  => {
    const get = async (req,res) => {
        try{

            const modulos = await app.db('modulos')
                // .select('id')
                .where({idUsuario: req.params.id})
                // .then((modulo) => {res.json(modulo)})
                // .catch(err => res.status(500))
            
            const remedios = await app.db('remedios')
                .where({idUsuario: req.params.id})

            const recorrencias = []
            for(let i=0;i<remedios.length;i++){
                const recorrencia = await app.db('recorrencias')
                    .where({idRemedio: remedios[i].id})
                    
                // if(Object.keys(recorrencia).length !== 0){
                    if(recorrencia.length!==0){ 
                    recorrencias.push(recorrencia[0])
                } 
            } 

            const status = { modulos, remedios, recorrencias }    
            res.json(status)
            
            
        } catch(err) {
            return res.status(400).send(err)
        }
    }
    return { get }
}