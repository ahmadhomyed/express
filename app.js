const express = require("express");
const app = express();
const port = 3000;
// app.use(express.static('./views'))
// CRUD  create read update delete

const courses = [
	{
		id: 1,
		title: "JS Course",
		price: 1000,
	},
	{
		id: 2,
		title: "react course",
		price: 1200,
	},
	{
		id: 3,
		title: "react course",
		price: 1200,
	},
	,
	{
		id: 4,
		title: "react course",
		price: 1200,
	},
	,
	{
		id: 5,
		title: "react course",
		price: 1200,
	},
];
// console.log(courses);
app.get("/api/courses", (req, res) => {
	res.json(courses);
});
app.get("/api/courses/:courseId", (req, res) => {
	console.log(req.params);
	// let id = req.params.courseId;
	// const course = courses.find((course) => course.id === id);
	// res.json(course);
});
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
