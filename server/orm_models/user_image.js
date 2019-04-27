const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const UserImage = sequelize.define('user_image', {
        id: {
          field: 'id',
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true  
        },
        userId: {
          field: 'user_id',
          type: Sequelize.INTEGER
        },
        image: {
          field: 'image',
          type: Sequelize.BLOB
        }, 
      },  {
        freezeTableName: true,
      });
      return UserImage;
}