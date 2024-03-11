const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
	"mongodb+srv://homyed:nodejs@learn-mongodb.opxal01.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongodb";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});
const main = async () => {
	await client.connect();
	console.log("connection established");
	const db = client.db("monogo-app");
	const collection = db.collection("courses");
	await collection.insertOne({
		title: "nodjs",
		price: 2000,
	});
	const data = await collection.find().toArray();
	console.log("data", data);
};
main();
// async function run() {
// 	try {
// 		// Connect the client to the server	(optional starting in v4.7)
// 		await client.connect();
// 		// Send a ping to confirm a successful connection
// 		await client.db("monogo-app").command({ ping: 1 });
// 		console.log("Pinged your deployment. You successfully connected to MongoDB!");
// 	} finally {
// 		// Ensures that the client will close when you finish/error
// 		await client.close();
// 	}
// }
// run().catch(console.dir);
