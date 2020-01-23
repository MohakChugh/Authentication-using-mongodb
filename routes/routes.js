const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();

const authControllers = require('../controllers/authControllers')
const mongoUserController = require('../controllers/mongoUser')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/login')
    .post(authControllers.login)

router.route('/register')
    .post(authControllers.register)

router.route('/validateToken')
    .post(authControllers.validateToken)
    
router.route('/user')
    .post(mongoUserController.createUser)
    .get(mongoUserController.getUserById)

router.route('/feed')
    .get(mongoUserController.getAllUsersAndData)

module.exports = router
