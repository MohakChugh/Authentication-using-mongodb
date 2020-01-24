const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

const config = require('../configuration/config')
const mongoFunctions = require('../database/db/functions/userFunctions')

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
    return mongoFunctions.createUser(name, email, password)
}

const loginUser = async (email, password) => {
    // Fetch password hash from database
    let hashPasswordFromDatabase = await mongoFunctions.fetchPasswordOfUser(email)

    // Compare user entered password with hashed password in database
    return await bcrypt.compare(password, hashPasswordFromDatabase)
        .then(async result => {
            // If password matched
            if (result === true) {
                // Generate token
                // Fetch userid from database using email
                let userid = await mongoFunctions.fetchUserid(email)
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
    return await mongoFunctions.checkIfUserExists(tokenDecoder.userid)
}

exports.registerUser = registerUser
exports.loginUser = loginUser
exports.validateToken = validateToken
