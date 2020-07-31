const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const Config = require('../../environments/index');
const Auth = require('../../services/auth.service');
const User = require('./user.model');
async function register(req) {
    const _b = req.body;
    try {
        if (!_b.password) {
            throw new Error("Password cannot be null");
        } else if (!_b.email) {
            throw new Error("email cannot be null");
        } else {
            let u = await User.findOne({
                where: {
                    email: _b.email
                },
                attributes: ['id']
            })
            if (u) {
                return {
                    code: 400,
                    data: {
                        status: false,
                        message: "Email already registered"
                    }
                }
            } else {
                data = await User.create({
                    email: _b.email,
                    password: bcrypt.hashSync(_b.password, 0),
                    userName: _b.userName,
                    firstName: _b.firstName,
                    lastName: _b.lastName,
                    mobileNumber: _b.mobileNumber
                })
                const auth = Auth.encode(data.id);
                if (!Config.autoVerifyEmail) Mailer(auth);
                return {
                    code: 200,
                    data: {
                        status: false,
                        message: "Registered Successfully"
                    }
                }
            }
        }
    }
    catch (err) {
        console.error(e);
        return {
            code: 400,
            data: {
                status: false,
                message: e.message
            }
        }
    }
};

async function login(req) {
    const _b = req.body;
    try {
        if (!_b.email) {
            throw new Error("Email cannot be null");
        } else if (!_b.password) {
            throw new Error("Password cannot be null");
        } else {
            const user = await User.findOne({ where: { email: _b.email } });
            if (!user) {
                throw new Error('data not found');
            } else if (!user.emailVerified) {
                throw new Error('Email not Verified');
            } else if (!bcrypt.compareSync(_b.password, user.password)) {
                throw new Error('Wrong Password');
            } else {
                const updatedUser = await User.findOne({ where: { id: user.id } });
                const auth = Auth.encode(user.id);
                return {
                    code: 200,
                    data: { status: true, ...{ ...(updatedUser.dataValues), auth: auth } }
                }
            }
        }
    }
    catch (err) {
        console.log(err)
        return {
            code: 400,
            data: { status: true, message: err.message }
        }
    }
};

async function get(req) {
    const _b = req.body;
    try {
        const opts = { where: {}, attributes: { exclude: ['password'] } };
        if (+_b.offset) opts.offset = +_b.offset;
        if (+_b.limit) opts.limit = +_b.limit;
        if (typeof _b.keyword === 'string') opts.where.name = { [sequelize.Op.like]: `%${_b.keyword}%` };

        let u = await User.findAll(opts)
        if (!u) {
            return {
                code: 400,
                data: {
                    status: false,
                    message: 'user not found'
                }
            }
        } else {
            return {
                code: 200,
                data: {
                    status: true,
                    data: u
                }
            }
        }
    }
    catch (err) {
        console.log(err)
        return {
            code: 400,
            data: { status: true, message: err.message }
        }
    }
};

async function update(req) {
    const _b = req.body;
    try {
        let u = await User.update({
            userName: _b.userName,
            firstName: _b.firstName,
            lastName: _b.lastName,
            mobileNumber: _b.mobileNumber,
        }, {
            where: {
                id: req.user.id,
            }
        })
        return {
            code: 200,
            data: { ...u.dataValues, status: true }
        }
    }
    catch (err) {
        console.log(err)
        return {
            code: 400,
            data: { status: true, message: err.message }
        }
    }
}
exports.register = register;
exports.login = login;
exports.get = get;
exports.update = update;