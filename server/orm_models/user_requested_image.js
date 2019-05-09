//Модел UserRequestedImage - пази снимки, поискани на живо от потребител
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const UserRequestedImage = sequelize.define('user_requested_image', {
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
      return UserRequestedImage;
}