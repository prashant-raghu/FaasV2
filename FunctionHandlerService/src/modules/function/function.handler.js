const sequelize = require('sequelize');
const Config = require('../../environments/index');
const Function = require('./function.model');
async function create(req) {
    const _b = req.body;
    try {
        if (!_b.code) {
            throw new Error("code cannot be null");
        } else if (!_b.language) {
            throw new Error("language cannot be null");
        } else {
            data = await Function.create({
                code: _b.code,
                language: _b.language,
                userId: _b.userId
            })
            return {
                code: 200,
                data: {
                    status: true,
                    data: data
                }
            }
        }
    }
    catch (err) {
        console.error(err);
        return {
            code: 400,
            data: {
                status: false,
                message: err.message
            }
        }
    }
};

async function executeRead(req) {
    const _b = req.body;
    try {
        const opts = { where: {} };
        opts.where.id = _b.functionId;
        let u = await Function.findOne(opts)
        if (!u) {
            return {
                code: 400,
                data: {
                    status: false,
                    message: 'function not found'
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

async function read(req) {
    const _b = req.body;
    try {
        const opts = { where: {} };
        if (+_b.offset) opts.offset = +_b.offset;
        if (+_b.limit) opts.limit = +_b.limit;
        if (_b.userId) opts.where.userId = _b.userId;
        if (_b.functionId) opts.where.id = _b.functionId;
        let u = await Function.findAll(opts)
        if (!u) {
            return {
                code: 400,
                data: {
                    status: false,
                    message: 'functions not found'
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

async function remove(req) {
    const _b = req.body;
    try {
        let u = await Function.destroy({
            where: {
                id: _b.functionId,
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
};

async function update(req) {
    const _b = req.body;
    try {
        let u = await Function.update({
            code: _b.code,
            language: _b.language,
        }, {
            where: {
                id: _b.functionId,
                userId: _b.userId
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
exports.create = create;
exports.read = read;
exports.executeRead = executeRead;
exports.remove = remove;
exports.update = update;