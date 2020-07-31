const express = require('express');
const router = express.Router();
const passport = require('passport');
const Controller = require('./app.controller');
const Events = require("./user/user.events");

/* GET home page. */
router.route('/').get(Controller.get);
router.use('/user', require('./user/user.router'));

module.exports = router;
