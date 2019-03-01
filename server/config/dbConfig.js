const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DBNAME||'Dzvun', process.env.DBUserId||'postgres',process.env.DBPASS||'12356', {
    host: process.env.DBCON||'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
        timestamps: false
    },
  
  });

  module.exports = sequelize;