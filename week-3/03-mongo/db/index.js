const mongoose = require("mongoose");
// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://admin:PhMTPz0Mo77r99Zz@cluster0.fiofav5.mongodb.net/course_selling_app"
);

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ]
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: String,
  desc: String,
  image: String,
  price: Number
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
