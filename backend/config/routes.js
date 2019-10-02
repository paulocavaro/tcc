module.exports = app => {
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
}