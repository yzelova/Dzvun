//Инициализация на ORM моделите
module.exports =  (sequelize) => {
    const User = require('./user')(sequelize);
    const UserImage = require('./user_image')(sequelize);
    const Device = require('./device')(sequelize);
    const UserDevice = require('./user_device')(sequelize);
    const UserRequestedImage = require('./user_requested_image')(sequelize);
    User.hasMany(UserImage);
    UserImage.belongsTo(User);

    User.hasMany(UserRequestedImage);
    UserRequestedImage.belongsTo(User);

    User.hasMany(UserDevice);
    UserDevice.belongsTo(User);
    UserDevice.belongsTo(Device);
    
    return {
        User,
        UserImage,
        Device, 
        UserDevice,
        UserRequestedImage
    }
}