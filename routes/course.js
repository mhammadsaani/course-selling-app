const { Router } = require('express')

const courseRouter = Router()

courseRouter.post('/purchase', function(req, res){
    res.json({
        'msg': "Nothingg"
    })
})

courseRouter.get('/preview', function(req, res){
    res.json({
        'msg': "Nothingg"
    })
})

module.exports = {
    courseRouter: courseRouter
}