module.exports = app => {

    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)
    
    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)

    app.route('/users/:idUsuario/modulos')
        .post(app.api.modulos.save)
        .get(app.api.modulos.get)

    app.route('/users/:idUsuario/modulos/:id')
        .put(app.api.modulos.save)
        .get(app.api.modulos.getById)
        .delete(app.modulos.remove)

    app.rout('/users/:idUsuario/modulos/:idModulo/remedios')
        .post(app.api.remedios.save)
        .get(app.api.remedios.get)
    
    app.rout('/users/:idUsuario/modulos/:idModulo/remedios/:id')
        .put(app.api.remedios.save)
        .get(app.api.remedios.getById)
        .delete(app.api.remedios.remove)
}