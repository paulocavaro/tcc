module.exports = app => {

    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)
    
    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)

    app.route('/users/:idUsuario/modulos')
        .all(app.config.passport.authenticate())
        .post(app.api.modulos.save)
        .get(app.api.modulos.get)

    app.route('/users/:idUsuario/modulos/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.modulos.save)
        .get(app.api.modulos.getById)
        .delete(app.api.modulos.remove)

    app.route('/users/:idUsuario/remedios')
        .all(app.config.passport.authenticate())
        .post(app.api.remedios.save)
        .get(app.api.remedios.get)
    
    app.route('/users/:idUsuario/remedios/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.remedios.save)
        .get(app.api.remedios.getById)
        .delete(app.api.remedios.remove)
    
    app.route('/users/:idUsuario/recorrencias')
        .post(app.api.recorrencias.save)
        .get(app.api.recorrencias.getByRemedios)

    app.route('/users/:idUsuario/recorrencias/:id')
        .put(app.api.recorrencias.save)
        .delete(app.api.recorrencias.remove)

    app.route('/stats/:id')
        .get(app.api.stat.get)
}