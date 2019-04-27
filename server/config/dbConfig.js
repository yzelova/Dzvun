const Sequelize = require('sequelize');
const cfServices = require('cf-services');

let credentials;
try {

  credentials = cfServices({ tags: ['postgresql'] }).credentials;

} catch (e) {
  console.error(e);
  credentials = {
    dbname: process.env.DBNAME || 'Dzvun',
    username: process.env.DBUserId || 'postgres',
    password: process.env.DBPASS || '123456',
    hostname: process.env.DBCON || 'localhost',
    port: process.env.DBPORT || '5432'
  }
}
const sequelize = new Sequelize(credentials.dbname, credentials.username, credentials.password, {
  host: credentials.hostname,
  port: credentials.port,
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
  }

});

module.exports = sequelize;