
const auth = require("../services/auth.service");
exports.authorize = async (req, res, next) => {
    const _b = req.body;
    console.log(req.headers)
    let decoded = auth.decode(req.headers.authorization);
    if (!decoded) {
        res.status(400).send({ status: false, message: "unathorized" })
    }
    req.body.userId = decoded;
    next();
};
