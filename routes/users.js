const { Router } = require('express')
const { UserModel } = require('../db')
const { emailSchema, passwordSchema, text} = require('../zod')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRouter = Router()

userRouter.post('/signup', async function(req, res){
    const email = emailSchema.safeParse(req.body.email)
    const password = passwordSchema.safeParse(req.body.password)
    const name = text.safeParse(req.body.name)
    if (email.success && password.success && name.success){
        const hashedPassword = await bcrypt.hash(password.data, 5)
        console.log(hashedPassword)
        try{
            await UserModel.create({
                email: email.data,
                password: hashedPassword,
                name: name.data
            })
        }catch(error){
            return res.status(422).json({
                'mgs': "User not created"
            })
        }
    }
    return res.status(200).json({
        'Created': "User Created Successfully"
    })
})


userRouter.post('/login', async function(req, res){
    const email = emailSchema.safeParse(req.body.email)
    const password = passwordSchema.safeParse(req.body.password)
    if (email.success && password.success){
        const user = await UserModel.findOne({'email': email.data})
        const isValidPassword = await bcrypt.compare(password.data, user.password)
        if (isValidPassword){
            const token = jwt.sign({email: email.data, id: user._id}, process.env.JWT_USER)
            return res.status(200).json({
                token: token
            })
        }
    }
    
    return res.json({
        'msg': "User not authenticated"
    })
})


userRouter.get('/purchases', function(req, res){
    res.json({
        'msg': "Nothingg"
    })
})

module.exports = {
    userRouter: userRouter
}