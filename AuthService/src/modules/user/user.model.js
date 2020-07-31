const connection = require('../../services/sequelize.service').connection();
const Sequelize = require('sequelize');
const Config = require('../../environments/index');

//Sequelize ORM user design

const User = connection.define('User', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mobileNumber: {
            type: Sequelize.STRING
        },
        emailVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: Config.autoVerifyEmail
        },
    },
    {
        indexes: [{unique: true, fields: ['email']}]
    }
);
module.exports = User;

function oTm(A, B) {
    A.hasMany(B);
    B.belongsTo(A);
}

function oTm(A, B, as) {
    A.hasMany(B, {as: as});
    B.belongsTo(A, {as: as});
}

function oTm(A, B, fk, as) {
    A.hasMany(B, {foreignKey: fk, as: as});
    B.belongsTo(A, {foreignKey: fk, as: as});
}

function mTm(A, B, through) {
    A.belongsToMany(B, {through: through});
    B.belongsToMany(A, {through: through});
}

function mTm(A, B, through, as) {
    A.belongsToMany(B, {through: through, as: as});
    B.belongsToMany(A, {through: through, as: as});
}

