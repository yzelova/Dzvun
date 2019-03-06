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
        imageName: {
          field: 'image_name',
          type: Sequelize.STRING
        }, 
        created_at: {
            field: 'created_at',
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },  {
        freezeTableName: true,
      });
      return UserImage;
}