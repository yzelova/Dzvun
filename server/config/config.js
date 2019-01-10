const sequelize = require('./dbConfig');
const passport = require('passport')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');

module.exports = (app) => {
    app.use(cookieParser());
    app.use(session({
        secret: 'i am a muffin',
        resave: true,
        saveUninitialized: true
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passport.initialize());
    app.use(passport.session());

    const csrfProtection = csrf({cookie: true});

    const models = require('../models/index')(sequelize);
    require('./passportConfig')(passport, models);
    require('./routersConfig')(app, passport, csrfProtection);

}