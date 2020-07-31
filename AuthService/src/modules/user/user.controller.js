const handler = require("./user.handler")
exports.register = async (req, res) => {
    const _b = req.body;
    let ret = await handler.register(req)
    res.status(ret.code).send(ret.data)
};
exports.login = async (req, res) => {
    const _b = req.body;
    let ret = await handler.login(req)
    res.status(ret.code).send(ret.data)
};

exports.get = async (req, res) => {
    const _b = req.body;
    let ret = await handler.get(req)
    res.status(ret.code).send(ret.data)
};

exports.update = async (req, res) => {
    const _b = req.body;
    let ret = await handler.update(req)
    res.status(ret.code).send(ret.data)
};
