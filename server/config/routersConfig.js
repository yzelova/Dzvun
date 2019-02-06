module.exports = (app, passport, csrfProtection) => {
    app.use('/login', require('../routers/login')(passport, csrfProtection));
    app.use('/signup', require('../routers/signup')(passport, csrfProtection));
    app.use('/get-sess-info', require('../routers/get-sess-info')(csrfProtection));
    app.use('/uploadImage', require('../routers/get-image')(csrfProtection));
}