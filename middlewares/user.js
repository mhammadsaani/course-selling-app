const jwt = require('jsonwebtoken')

async function userMiddleware(req, res, next){
    const token = req.headers.token
    const decodedToken = jwt.verify(token, process.env.JWT_USER)
    if (decodedToken){
            req.userId = decodedToken.id
            return next()
        }
    return res.status(403).json({
                'msg': "User not authenticated"
    })
}


module.exports = {
    userMiddleware
}