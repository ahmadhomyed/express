const mongoose = require("mongoose");
const validator = require("validator");
const userRole = require("../utilitis/userRoles");
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		validate: [validator.isEmail, "must be valid email"],
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
	},
	role: {
		type: String, // [user,admin,manger]
		enum: [userRole.ADMIN, userRole.USER, userRole.MANAGER],
		default : userRole.USER , 
	},
	avatar:{
		type : String,
		default :"/uploads/avatar.jpg "
	}
});
module.exports = mongoose.model("User", userSchema);
