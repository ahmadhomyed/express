const { validationResult } = require("express-validator");
const Course = require("../models/course.model");
const httpStatus = require("../utilitis/httpsStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const express = require("express");
const app = express();
app.use(express.json());
const getAllCourses = async (req, res) => {
	// get all courses from the database using course model
	// $gt greater than
	// const courses = await Course.find({queryfilter},{projection}});
	const query = req.query;
	const limit = query.limit || 10;
	const page = query.page || 1;
	const skip = (page - 1) * limit;
	const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
	res.json({
		status: httpStatus.SUCCESS,
		data: {
			courses,
		},
	});
};
const getCourse = asyncWrapper(async (req, res) => {
	// let id = +req.params.courseId;
	// const course = courses.find((course) => course.id === id);const course = await Course.findById(req.params.courseId);
	if (!course) {
		return res.status(404).json({ status: httpStatus.FAILED });
	}
	return res.json({
		status: "success",
		data: {
			course,
		},
	});
});

const addCourse = async (req, res) => {
	const err = validationResult(req);
	if (!err.isEmpty()) {
		return res.status(400).json({ status: httpStatus.FAILED });
	}
	// courses.push({ id: courses.length + 1, ...req.body });
	const newCourse = new Course(req.body);
	await newCourse.save();
	res.status(201).json(newCourse);
};
const editCourse = asyncWrapper();
async (req, res) => {
	// const id = +req.params.courseId;
	// let course = courses.find((course) => course.id === id);
	// if (!course) {
	// 	return res.status(404).json("Course not Found");
	// }
	// course = { ...course, ...req.body };
	try {
		const courseId = req.params.courseId;
		const updatedCourse = await Course.findByIdAndUpdate(courseId, { $set: { ...req.body } });
		return res.status(200).json(updatedCourse);
	} catch (e) {
		return res.status(400).json({
			status: httpStatus.FAILED,
			data: {
				title: httpStatus.FAILED,
			},
		});
	}
};
const delCourse = async (req, res) => {
	// const courseId = +req.params.courseId;
	// filterCourses = courses.filter((course) => course.id !== courseId);
	// res.json(filterCourses);
	try {
		const courseId = req.params.courseId;
		const deletedCourse = await Course.deleteOne({ _id: courseId });
		return res.status(200).json({
			status: httpStatus.SUCCESS,
		});
	} catch (e) {
		return res.status(400).json({ status: httpStatus.FAILED });
	}
};

module.exports = { addCourse, getCourse, getAllCourses, editCourse, delCourse };
