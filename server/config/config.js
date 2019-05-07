const sequelize = require('./dbConfig');
const passport = require('passport')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors')

module.exports = async (app) => {
    app.use(cors());
    app.use(cookieParser());
    app.use(session({
        secret: 'i am a muffin',
        resave: true,
        saveUninitialized: true
    }));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
    app.use(passport.initialize());
    app.use(passport.session());

    /*await sequelize.query('DROP TABLE user_image');
    
    await sequelize.query('DROP TABLE users');*/
    
    

    await sequelize.query(`CREATE TABLE IF NOT EXISTS users
    (
        id serial NOT NULL,
        first_name text COLLATE pg_catalog."default",
        last_name text COLLATE pg_catalog."default",
        email text COLLATE pg_catalog."default" NOT NULL,
        password text COLLATE pg_catalog."default" NOT NULL,
        is_admin boolean NOT NULL DEFAULT false,
        fcm_token text COLLATE pg_catalog."default",
        CONSTRAINT users_pkey PRIMARY KEY (id)
    )`);

    /*await sequelize.query(`INSERT INTO users (id, first_name, last_name, email, password, is_admin)
                            VALUES (DEFAULT, null, null, admin, $2b$10$dSli1NI7oFA7.zhxt9WhN./FCUQWehB//28HxGb2Z6z9m08qS42b6, true)`);*/

    await sequelize.query(`CREATE TABLE IF NOT EXISTS user_image
    (
        id serial NOT NULL,
        user_id bigint NOT NULL,
        image bytea NOT NULL,
        CONSTRAINT user_image_pkey PRIMARY KEY (id),
        CONSTRAINT user_image_user_id_fkey FOREIGN KEY (user_id)
            REFERENCES users (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
    )`);

    const ormModels = require('../orm_models/index')(sequelize);
    const models = require('../models/index')(ormModels);
    require('./passportConfig')(passport, ormModels, models);
    require('./routersConfig')(app, ormModels, passport);

}