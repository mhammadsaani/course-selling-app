const jwt = require('jsonwebtoken')

async function adminMiddleware(req, res, next){
    const token = req.headers.token
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, process.env.JWT_ADMIN)
    }catch(error){
        return res.status(403).json(
            {
                'msg': "Not authenticated"
            }
        )
    }
    if (decodedToken){
            req.userId = decodedToken.id
            return next()
        }
    return res.status(403).json({
                'msg': "admin not authenticated"
    })
}


module.exports = {
    adminMiddleware
}