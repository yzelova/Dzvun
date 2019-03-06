module.exports = (app, ormModels, passport, csrfProtection) => {
    app.use('/login', require('../routers/login')(passport, csrfProtection));
    app.use('/signup', require('../routers/signup')(passport, csrfProtection));
    app.use('/get-sess-info', require('../routers/get-sess-info')(csrfProtection));
    app.use('/signout', require('../routers/signout')(csrfProtection));
    app.use('/uploadImage', require('../routers/get-image')(ormModels));
    app.use('/timeline', require('../routers/timeline')(ormModels))
}