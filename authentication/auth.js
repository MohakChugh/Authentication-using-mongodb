const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

const config = require('../configuration/config')
const database = require('../database/fakedb/fakedb')

const saltRounds = 10

const registerUser = async (name, email, password) => {
    if (!validator.isEmail(email)) {
        return false;
    }

    // Encrypt Password
    await bcrypt.hash(password, saltRounds)
        .then(hash => {
            password = hash
        })
    
    // If user email and name is vaid, Save user in database
    return database.registerUser(name, email, password)
}

const loginUser = async (email, password) => {
    // Fetch password hash from database
    let hashPasswordFromDatabase = database.getHashedPassword()

    // Compare user entered password with hashed password in database
    return await bcrypt.compare(password, hashPasswordFromDatabase)
        .then(result => {
            // If password matched
            if (result === true) {
                // Generate token
                // Fetch userid from database using email
                let userid = database.user.userid
                return jwt.sign({ userid }, config.secretKey , { expiresIn: '7 days' })
            } else {
                console.log('User Not Found')
                return false
            }
        })
        .catch(err => {
            console.log(err)
            return err
        })
}

const validateToken = async (token) => {
    // Decode Jwt which contains userid
    let tokenDecoder = jwt.verify(token, config.secretKey)
    // Check is userid Exists in database
    // If true return true
    // Else return False
    return database.checkIfUserExists(tokenDecoder.userid)
}

exports.registerUser = registerUser
exports.loginUser = loginUser
exports.validateToken = validateToken
