const { Router } = require('express')
const jwt = require('jsonwebtoken')
const { AdminModel, CourseModel } = require('../db')
const bcrypt = require('bcrypt')
const { emailSchema, passwordSchema, text} = require('../zod')
const { adminMiddleware } = require('../middlewares/admin')

const adminRoute = Router()


adminRoute.post('/signup', async function(req, res){
    const email = emailSchema.safeParse(req.body.email)
    const password = passwordSchema.safeParse(req.body.password)
    const name = text.safeParse(req.body.name)
    if (email.success && password.success && name.success){
        const hashedPassword = await bcrypt.hash(password.data, 5)
        console.log(hashedPassword)
        try{
            await AdminModel.create({
                email: email.data,
                password: hashedPassword,
                name: name.data
            })
        }catch(error){
            return res.status(422).json({
                'mgs': "Admin not created"
            })
        }
    }
    return res.status(200).json({
        'Created': "Admin Created Successfully"
    })
})

adminRoute.post('/login', async function(req, res){
    const email = emailSchema.safeParse(req.body.email)
    const password = passwordSchema.safeParse(req.body.password)
    console.log(email, password)
    if (email.success && password.success){
        const user = await AdminModel.findOne({'email': email.data})
        const isValidPassword = await bcrypt.compare(password.data, user.password)
        if (isValidPassword){
            const token = jwt.sign({email: email.data, id: user._id}, process.env.JWT_ADMIN)
            return res.status(200).json({
                token: token
            })
        }
    }
    
    return res.json({
        'msg': "User not authenticated"
    })
})


adminRoute.use(adminMiddleware)


adminRoute.post('/course', async function(req, res){
    const adminId = req.userId  
    const { title, description, price, imageUrl } = req.body
    try {
        await CourseModel.create({
            title, 
            description,
            price,
            imageUrl,
            creatorId: adminId
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            'msg': "Course not created",
            'error': error
        })
    }

    res.json({
        'msg': "Course Created Successfully"
    })
})


adminRoute.put('/course/:id', async function(req, res){
    const adminId = req.userId  
    const { title, description, price, imageUrl } = req.body

    try {
        await CourseModel.findOneAndUpdate({_id: req.params.id} , {
            title, 
            description,
            price,
            imageUrl,
            creatorId: adminId
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            'msg': "Course not Updated",
            'error': error
        })
    }

    res.json({
        'msg': "Course Updated Successfully"
    })
})

adminRoute.get('/course/bulk', async function(req, res){
    const adminId = req.userId  
    try{
        const courses = await CourseModel.find({
            creatorId: adminId
        })
        return res.status(200).json({
            courses
        })
    }catch(error){
        res.json({
            msg: "Error"
        })
    }
    res.json({
        'msg': "No Courses"
    })
})

module.exports = {
    adminRoute: adminRoute
}