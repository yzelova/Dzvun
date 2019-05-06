const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const User = sequelize.define('devices', {
        id: {
            field: 'id',
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        deviceAddress: {
            field: 'device_address',
            type: Sequelize.STRING
        },
    }, {
            timestamps: false,
            freezeTableName: true,
        });
    return User;
}