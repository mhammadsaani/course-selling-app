const express = require('express')
const { userRouter } = require('./routes/users')
const { courseRouter }= require('./routes/course')
const { adminRoute } = require('./routes/admin')
const { UserModel, AdminModel, CourseModel, PurchasedCourseModel } = require('./db')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()
app.use(express.json())

app.use("/user", userRouter)
app.use('/course', courseRouter)
app.use('/admin', adminRoute)



async function main(){
    await mongoose.connect(process.env.DB_URL)
    app.listen(3000, ()=>{
        console.log(`Listening on the following http://localost:3000`)
    })

}

main()