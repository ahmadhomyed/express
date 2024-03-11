const express = require("express");
const { body, validationResult } = require("express-validator");
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const middleWares = [
	body("title").notEmpty().withMessage("title is required").isLength({ min: 2 }).withMessage("min length is 2"),
	body("price").notEmpty().withMessage("price is required"),
];
const router = express.Router();
const { addCourse, getCourse, getAllCourses, editCourse, delCourse } = require("../controllers/courses.controller");
const userRole = require("../utilitis/userRoles");
router.route("/").get(getAllCourses).post(middleWares, addCourse);
//get single course
router.route("/:courseId").get(getCourse).patch(editCourse).delete(verifyToken, allowedTo(userRole.ADMIN, userRole.MANGER), delCourse);

// add new source
// use express-validator npm or joi

// router.post( middleWares, addCourse);
//update a course
// router.patch(":courseId", editCourse);
// //delete
// router.delete(":courseId", delCourse);
module.exports = router;
