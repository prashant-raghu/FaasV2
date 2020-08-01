exports.authorize = async (req, res, next) => {
    if (req.headers.authorization)
        req.body.auth = req.headers.authorization;
    next();
};