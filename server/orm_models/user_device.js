//Модел UserDevice - пази връзката между потребител и устройство
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const UserDevice = sequelize.define('user_device', {
        id: {
            field: 'id',
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            field: 'user_id',
            type: Sequelize.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        deviceId: {
            field: 'device_id',
            type: Sequelize.INTEGER,
            references: {
                model: 'Device',
                key: 'id'
            }
        },
    }, {
            freezeTableName: true,
        });
    return UserDevice;
}