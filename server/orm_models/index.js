module.exports =  (sequelize) => {
    const User = require('./user')(sequelize);
    const UserImage = require('./user_image')(sequelize);
    const Device = require('./device')(sequelize);
    UserImage.belongsTo(User);
    
    return {
        User,
        UserImage,
        Device
    }
}