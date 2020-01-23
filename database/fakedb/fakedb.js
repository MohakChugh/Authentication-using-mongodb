const user = {
    userid: "1",
    name: 'Mohak Chugh',
    email: 'me.mohakchugh@gmail.com',
    password: 'test'
}

const registerUser = async (name, email, password) => {
    user.name = name
    user.email = email
    user.password = password
    return user
}

const getHashedPassword = () => {
    return user.password
}

const checkIfUserExists = async (userid) => {
    if (userid != user.userid) {
        return false
    }
    return true
}

exports.user = user
exports.registerUser = registerUser
exports.getHashedPassword = getHashedPassword
exports.checkIfUserExists = checkIfUserExists