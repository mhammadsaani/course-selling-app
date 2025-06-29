const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    name: String, 
});

const AdminSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String
});

const CourseSchema = new mongoose.Schema({
    title: String, 
    description: String,
    price: Number, 
    imageUrl: String, 
    creatorId: ObjectId
});

const PurchasedCourseSchema = new mongoose.Schema({
    courseId: ObjectId,
    userId: ObjectId
});

const UserModel = mongoose.model("user", UserSchema);
const AdminModel = mongoose.model('admin', AdminSchema);
const CourseModel = mongoose.model('course', CourseSchema);
const PurchasedCourseModel = mongoose.model('purchase', PurchasedCourseSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchasedCourseModel
};
