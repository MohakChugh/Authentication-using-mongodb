const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();

const authentication = require('../authentication/auth')
const authControllers = require('../controllers/authControllers')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/login')
    .post(authControllers.login)

router.route('/register')
    .post(authControllers.register)

router.route('/validateToken')
    .post(authControllers.validateToken)

module.exports = router
