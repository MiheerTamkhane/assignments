const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { Course, User } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  const response = await User.create({
    username,
    password,
  });
  res.json({ message: `${response.username} user got created.` });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const user = User.findOne({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign({ username, password }, JWT_SECRET);
    res.json({
      token,
    });
  } else {
    req.json({
      msg: "Wrong username and password.",
    });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.json({
    courses,
  });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.username;
  User.updateOne(
    {
      username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  ).catch((e) => {
    console.error(e);
  });
  res.json({
    message: "Purchase Complete!",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.username;
  const user = await User.findOne({
    username,
  });
  const purchasedCourses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.json({
    courses: purchasedCourses,
  });
});

module.exports = router;
