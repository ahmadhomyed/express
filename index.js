const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
const path = require("path");
// mongoose.connect(url).then(() => {
// 	console.log("connection established mongoose");
// });
async function main() {
	await mongoose.connect(url);
}
main().catch((err) => console.log(err));
const port = 3000;
const coursesRouter = require("./routes/courrses");
const usersRouter = require("./routes/users.rotute");
app.use("/api/uploads", express.static(path.join(__dirname,'uploads')));
app.use(cors());
app.use(express.json());
app.use("/api/courses", coursesRouter);
// if passed all routes and found nothing 404
app.use("/api/users", usersRouter);
app.all("*", (req, res, next) => {
	res.json("error not Found");
});
app.use((error, req, res, next) => {
	res.status(500).json(error);
});
app.listen(port, () => {
	console.log(`index.js app listening on port ${process.env.PORT}`);
});
