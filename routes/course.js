const { Router } = require('express')
const { userMiddleware } = require('../middlewares/user')
const { PurchasedCourseModel, CourseSchema, CourseModel } = require('../db')


const courseRouter = Router()

courseRouter.use(userMiddleware)


courseRouter.post('/purchase', async function(req, res){
    const userId = req.userId
    const { courseId } = req.body

    console.log(userId)
    console.log(courseId)
    
    await PurchasedCourseModel.create({
        courseId,
        userId
    })
    return res.json({
        'msg': "Course Purchased"
    })
})

courseRouter.get('/my-purchases', async function(req, res){
    const userId = req.userId

    const purchases = await PurchasedCourseModel.find(
        { userId }
    )
    const courses = await CourseModel.find({
        _id: { $in: purchases.map(x => x.courseId )}
    })

    res.json({
        purchases,
        courses
    })
})

courseRouter.get('/preview', async function (req, res) {
    const courses = await CourseModel.find({})
    res.json({
        courses
    })  
})

module.exports = {
    courseRouter: courseRouter
}