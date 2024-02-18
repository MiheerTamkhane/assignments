const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require('../db')
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password
    // make use of zod here...
    // Admin.findOne({
    //     username,
    //     password
    // }).then(data => {
    //     if (data) {
    //         res.status(403).json({
    //             message: "User Already Exists."
    //         })
    //     }
    // })
    Admin.create({
        username,
        password
    }).then(() => {
        res.json({
            message: "Admin created successfully."
        })

    }).catch(() => {
        res.json({
            message: 'Admin not created.'
        })
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title
    const desc = req.body.desc
    const image = req.body.image
    const price = parseInt(req.body.price)
    const course = await Course.create({
        title,
        desc,
        image,
        price
    })
    res.json({ message: 'Course created successfully', courseId: course._id })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

module.exports = router;