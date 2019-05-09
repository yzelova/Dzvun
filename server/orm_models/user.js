/*
Модел User - пази следната информация за всеки потребител:
уникален номер;
първо име;
фамилия;
имейл;
хеш на парола;
дали има админски права;
fcm ключ, използван за ивестия;
дали е заявил снимка на живо;
*/
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
  const User = sequelize.define('users', {
    id: {
      field: 'id',
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      field: 'first_name',
      type: Sequelize.STRING
    },
    lastName: {
      field: 'last_name',
      type: Sequelize.STRING
    },
    email: {
      field: 'email',
      type: Sequelize.STRING
    },
    password: {
      field: 'password',
      type: Sequelize.STRING
    },
    isAdmin: {
      field: 'is_admin',
      type: Sequelize.BOOLEAN
    },
    fcmToken: {
      field: 'fcm_token',
      type: Sequelize.STRING
    },
    liveImageRequested: {
      field: 'live_image_requested',
      type: Sequelize.BOOLEAN
    }
  }, {
      timestamps: false,
      freezeTableName: true,
    });
  User.associate = (models) => {
    User.belongsToMany(models.Device, {
      through: 'UserDevice',
      as: 'Device',
      foreignKey: 'userId'
    });
  };
  return User;
}