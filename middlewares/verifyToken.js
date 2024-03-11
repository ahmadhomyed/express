const { split } = require("lodash");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const authHeader = req.headers["Authorization"] || req.headers["authorization"];
	if (!authHeader) {
		return next("error not authorized");
	}

	const token = authHeader.split(" ")[1];
	try {
		const currentUser =  jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.currentUser = currentUser;
		next();
	} catch (e) {
		return next("error invalid or expired token");
	}
};
module.exports = verifyToken;
