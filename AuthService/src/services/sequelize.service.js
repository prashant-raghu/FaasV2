const dbConfig = require('../environments/index').db;
const sequelize = require("sequelize");

let Sequelize;

exports.init = () => {

    Sequelize = new sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        define: {
            charset: 'utf8mb4'
        },
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
        logging: false
    });

    Sequelize.sync({alter: true, force: false});

}

exports.connection = () => Sequelize;
