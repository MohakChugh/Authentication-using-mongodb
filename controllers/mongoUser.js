const User = require('../database/mongo/models/user')

const createUser = async (req, res) => {
    let { name, email, password } = req.body
    let user = new User({ name, email, password })
    await user.save()
    res.send({ success: true, mes: 'Item Inserted'})
}

const getUserById = async (req, res) => {
    let { userid } = req.body
    let user = await User.findById(userid)
    res.send(user)
}

const getAllUsersAndData = async (req, res) => {
    let users = await User.find()
    res.send(users)
}

exports.createUser = createUser
exports.getUserById = getUserById
exports.getAllUsersAndData = getAllUsersAndData
