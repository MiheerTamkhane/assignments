const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  Admin.create({
    username,
    password,
  })
    .then(() => {
      res.json({
        message: "Admin created successfully.",
      });
    })
    .catch(() => {
      res.json({
        message: "Admin not created.",
      });
    });
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const admin = Admin.findOne({
    username,
    password,
  });
  if (admin) {
    const token = jwt.sign({ username, password }, JWT_SECRET);
    res.json({
      token,
    });
  } else {
    req.json({
      msg: "Wrong admin username & password.",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const desc = req.body.desc;
  const price = parseInt(req.body.price);
  const imageLink = req.body.imageLink;

  const course = await Course.create({
    title,
    desc,
    imageLink,
    price,
  });

  res.json({
    msg: "Course got created.",
    id: course._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const courses = await Course.find({});
  res.json({
    courses,
  });
});

module.exports = router;
