const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const Device = sequelize.define('devices', {
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
    Device.associate = (models) => {
        Device.belongsToMany(models.Users, {
            through: 'UserDevice',
            as: 'users',
            foreignKey: 'deviceId'
        });
    };
    return Device;
}