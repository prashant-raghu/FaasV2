const express = require('express');
const router = express.Router();
const passport = require('passport');
const Controller = require('./app.controller');
const Events = require("./function/function.events");

/* GET home page. */
router.route('/').get(Controller.get);
router.use('/function', require('./function/function.router'));

module.exports = router;
