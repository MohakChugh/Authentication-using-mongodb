const login = async (req, res) => {
    let { email, password } = req.body
    let result = await authentication.loginUser(email, password)
    res.send(result);
}

const register = async (req, res) => {
    let { email, password, name } = req.body
    let result = await authentication.registerUser(name, email, password)
    res.send(result)
}

const validateToken = async (req, res) => {
    let { token } = req.body
    let result = await authentication.validateToken(token)
    res.send(result);
}

exports.login = login
exports.register = register
exports.validateToken = validateToken