module.exports =  (sequelize) => {
    const User = require('./user')(sequelize);
    const UserImage = require('./user_image')(sequelize);

    UserImage.belongsTo(User);
    
    return {
        User,
        UserImage
    }
}