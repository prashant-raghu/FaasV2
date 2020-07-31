const handler = require("./function.handler")
exports.create = async (req, res) => {
    const _b = req.body;
    let ret = await handler.create(req)
    res.status(ret.code).send(ret.data)
};

exports.read = async (req, res) => {
    const _b = req.body;
    let ret = await handler.read(req)
    res.status(ret.code).send(ret.data)
};

exports.executeRead = async (req, res) => {
    const _b = req.body;
    let ret = await handler.executeRead(req)
    res.status(ret.code).send(ret.data)
};

exports.remove = async (req, res) => {
    const _b = req.body;
    let ret = await handler.remove(req)
    res.status(ret.code).send(ret.data)
};

exports.update = async (req, res) => {
    const _b = req.body;
    let ret = await handler.update(req)
    res.status(ret.code).send(ret.data)
};
