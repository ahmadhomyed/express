const express = require("express");
const app = express();
const multer = require("multer");
const diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		const ext = file.mimetype.split("/")[1];
		const fileName = `user-${Date.now()}.${ext}`;
		cb(null, fileName);
	},
});
const fileFilter = (req, file, cb) => {
	const imageType = file.mimetype.split("/")[0];
	if (imageType == "image") {
		return cb(null, true);
	} else {
		return cb("file type not supported", false);
	}
};
const upload = multer({ storage: diskStorage, fileFilter });
const router = express.Router();
const usersController = require("../controllers/usersControllers");
const verifyToken = require("../middlewares/verifyToken");
//get all users
//register
//login

router.route("/").get(verifyToken, usersController.getAllUsers);
router.route("/register").post(upload.single("avatar"), usersController.register);
router.route("/login").post(usersController.login);

module.exports = router;
