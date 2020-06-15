const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
    // get token from header 
    const token = req.header('x-auth-token')

    //check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' })
    }

    //verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.user.isAdmin == true) {
            req.user = decoded.user
            next()
        }
        else {
            res.status(401).json({ msg: "User is not admin user" })
        }

    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" })
    }

}