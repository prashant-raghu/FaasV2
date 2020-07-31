const router = require('express').Router();
const passport = require('passport');
const auth = require("../../middlewares/auth.middleware")
const Controller = require('./function.controller');

router.post('/create',auth.authorize, Controller.create);
router.post('/read',auth.authorize, Controller.read);
router.post('/executeRead',auth.authorize, Controller.executeRead);
router.post('/update',auth.authorize, Controller.update);
router.post('/delete',auth.authorize, Controller.remove);
router.route('/')
    .get(auth.authorize, Controller.read)
    .post(auth.authorize,Controller.create)
    .put(auth.authorize, Controller.update)
    .delete(auth.authorize, Controller.remove)

module.exports = router;
