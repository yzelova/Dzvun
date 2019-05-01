module.exports = (app, ormModels, passport) => {
    app.use('/login', require('../routers/login')(passport));
    app.use('/signup', require('../routers/signup')(passport));
    app.use('/get-sess-info', require('../routers/get-sess-info')());
    app.use('/signout', require('../routers/signout')());
    app.use('/uploadImage', require('../routers/get-image')(ormModels));
    app.use('/timeline', require('../routers/timeline')(ormModels))
}