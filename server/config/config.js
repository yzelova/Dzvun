const sequelize = require('./dbConfig');
const passport = require('passport')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');
const cors = require('cors')

module.exports = (app) => {
    app.use(cors());
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

    const ormModels = require('../orm_models/index')(sequelize);
    const models = require('../models/index')(ormModels);
    require('./passportConfig')(passport, ormModels, models);
    require('./routersConfig')(app, ormModels, passport, csrfProtection);

}