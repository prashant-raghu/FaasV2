const router = require('express').Router();
const passport = require('passport');

const Controller = require('./user.controller');
const UserGuard = passport.authenticate('user', {session: false});

router.post('/login', Controller.login);
router.post('/register', Controller.register);
router.post('/update',UserGuard, Controller.update);
router.post('/get', Controller.get);
router.route('/')
    .get(UserGuard, Controller.get)
    .post(Controller.register)
    .put(UserGuard, Controller.update)

module.exports = router;
