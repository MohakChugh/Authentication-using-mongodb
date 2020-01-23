const User = require('../database/mongo/models/user')

const createUser = async (req, res) => {
    let { name, email, password } = req.body
    let user = new User({ name, email, password })
    await user.save()
    res.send({ success: true, mes: 'Item Inserted'})
}

exports.createUser = createUser