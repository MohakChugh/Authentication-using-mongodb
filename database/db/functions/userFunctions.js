const User = require('../models/user')

const createUser = async (name, email, password) => {
    let user = new User({ name, email, password })
    return await user.save()
    
}

const getUserById = async (userid) => {
    let user = await User.findById(userid)
        .then(res => { return res })
        .catch(err => { return 'User Not Found' })
    console.log(user)
    return user
}

getAllUsersAndData = async () => {
    let users = await User.find()
    console.log(users)
    return users
}

const fetchPasswordOfUser = async (email) => {
    let user = await User.findOne({ email: email }).exec()
    return user.password
}

const fetchUserid = async (email) => {
    let user = await User.findOne({ email: email }).exec()
    console.log(user._id)
    return user._id
}

const checkIfUserExists = async (userid) => {
    let user = await User.findById(userid)
        .then(res => { return true })
        .catch(err => { return false })
    console.log(user)
    return user
}

exports.createUser = createUser
exports.getUserById = getUserById
exports.getAllUsersAndData = getAllUsersAndData
exports.fetchPasswordOfUser = fetchPasswordOfUser
exports.fetchUserid = fetchUserid
exports.checkIfUserExists = checkIfUserExists