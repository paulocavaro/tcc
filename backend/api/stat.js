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

            const status = { modulos, remedios }    
            res.json(status)
            
        } catch(err) {
            return res.status(400).send(err)
        }
    }
    return { get }
}