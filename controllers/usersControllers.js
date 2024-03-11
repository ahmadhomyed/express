const express = require("express");
const httpStatus = require("../utilitis/httpsStatusText");
const app = express();
const bcrypt = require("bcryptjs");
app.use(express.json());
const User = require("../models/user.modal");
const asyncWrapper = require("../middlewares/asyncWrapper");
const generateJWT = require("../utilitis/generateJWT");

const getAllUsers = asyncWrapper(async (req, res) => {
	const query = req.query;
	const limit = query.limit || 10;
	const page = query.page || 2;
	const skip = (page - 1) * limit;

	const users = await User.find({}, { __v: false, password: false });
	// .limit(limit).skip(skip);
	res.json(users);
});
const register = asyncWrapper(async (req, res) => {
	try {
		const { firstName, lastName, email, password, role } = req.body;
		const oldUser = await User.findOne({ email });
		if (oldUser) {
			return res.status(400).json("user already registered");
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			role,
			avatar: req.file.filename,
		});

		// generate token
		const token = await generateJWT({
			email: newUser.email,
			id: newUser._id,
			role: newUser.role,
		});
		newUser.token = token;
		await newUser.save();

		// console.log(newUser);
		res.status(201).json({ status: res.status, data: { user: newUser } });
	} catch (e) {
		res.json(e.message);
	}
});
const login = asyncWrapper(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email && !password) {
		const error = res.json("error");
		return next("error");
	}
	const user = await User.findOne({ email: email });
	const matchedPassword = await bcrypt.compare(password, user.password);
	if (user && matchedPassword) {
		const token = await generateJWT({ email: user.email, id: user._id, role: user.role });
		return res.json({ token });
	} else {
		return res.json("error not found");
	}
});
module.exports = {
	getAllUsers,
	register,
	login,
};
