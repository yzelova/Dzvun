const LocalStrategy = require('passport-local');

module.exports = (passport, models) => {
    const User = models.User;

    passport.serializeUser((user, done) => {
        if(!user) done(null, false)
        else done(null, user.id);
    });
      
    passport.deserializeUser(async (id, done) => {
        const userFromDb = await User.findByPk(id);
        const user = {
          id: userFromDb.dataValues.id,
          firstName: userFromDb.dataValues.firstName,
          lastName: userFromDb.dataValues.lastName,
          email: userFromDb.dataValues.email
        }
        if(user) done(null, user);
    });

    passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
        async function(email, password, done) {
          const user = await User.findOne({where: { email: email }});
          if(user){
            if(user.password !== password) return done(null, false, "Incorrect password");
            return done(null, user);
          } else {
            return done(null, false, "No such email found")
          }
        }
      ));

      passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
          async function(email, password, done) {
            const user = await User.findOne({where: { email: email }});
            if(user){
              return done(null, false, "User already exists");
            } else {
              const user = await User.create({email, password});
              return done(null, user);
            }
          }
        ));
} 