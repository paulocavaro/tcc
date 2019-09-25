const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req,res) => {
        const usuario = {... req.body }

        try{
            existsOrError(usuario.name, 'Nome não informado')
            existsOrError(usuario.email, 'E-mail não informado')
            existsOrError(usuario.password, 'Senha não informada')
            existsOrError(usuario.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(usuario.password, usuario.confirmPassword,
                'Senhas não conferem')
            
            const usuarioFromDB = await app.db('usuarios')
                .where({}).first()
            const emailFromDB = await app.db('usuarios')
                .where({email: usuario.email})

            notExistsOrError(usuarioFromDB,'Usuario ja cadastrado com esse email')
        } catch(msg){
            return res.status(400).send(msg)
        }
    }

    return { save }
}