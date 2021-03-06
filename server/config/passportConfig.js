/*
Конфигуриране на passport.js - библиотека за автентикация
*/


const LocalStrategy = require('passport-local');


module.exports = (passport, ormModels, models) => {
  const ormUser = ormModels.User;
  const User = models.User;

  passport.serializeUser((user, done) => {
    if (!user) done(null, false)
    else done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const userFromDb = await ormUser.findByPk(id);
    const user = {
      id: userFromDb.dataValues.id,
      firstName: userFromDb.dataValues.firstName,
      lastName: userFromDb.dataValues.lastName,
      email: userFromDb.dataValues.email
    }
    if (user) done(null, user);
    else {
      console.error('deserialization error')
    }
  });

  //Вход на админ
  passport.use('local-login-admin', new LocalStrategy(
    async function (username, password, done) {
      const user = await ormUser.findOne({ where: { email: username } });
      if (user && user.isAdmin) {
        const comp = await User.validPassword(password, user.password);
        if (!comp) return done(null, false, "Incorrect password");
        return done(null, user);
      } else {
        return done(null, false, "No such user found")
      }
    }
  ));

  //Вход на потребител
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    async function (req, email, password, done) {
      const fcm = req.body.token;
      const user = await ormUser.findOne({ where: { email: email } });
      if (user) {
        const comp = await User.validPassword(password, user.password);
        if (!comp) return done(null, false, "Incorrect password");
        if (fcm) {
          await ormUser.update({
            fcmToken: fcm
          }, {
              where: { id: user.id }
            })
        }
        return done(null, user);
      } else {
        return done(null, false, "No such email found")
      }
    }
  ));

  //Регистрация на потребител
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    async function (req, email, password, done) {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const fcm = req.body.token;
      const user = await ormUser.findOne({ where: { email: email } });
      if (user) {
        return done(null, false, "User already exists");
      } else {
        const user = await User.createUser(firstName, lastName, email, password, fcm);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    }
  ));
} 