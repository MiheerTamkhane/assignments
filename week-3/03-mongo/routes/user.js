const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    const response = await User.create({
        username,
        password
    })
    res.json({ message: `${response.username} user got created.` });
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({})
    res.json({
        courses
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const password = req.headers.password;
    User.updateOne({
        username, password
    }, {
        '$push': {
            purchasedCourses: courseId
        }

    }).catch(e => {
        console.error(e)
    })
    res.json({
        message: "Purchase Complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const user = await User.findOne({
        username
    })
    const purchasedCourses = await Course.find({
        _id: {
            '$in': user.purchasedCourses
        }
    })
    res.json({
        courses: purchasedCourses
    })
});

module.exports = router