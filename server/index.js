import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

//open ai configuration
const configuration = new Configuration({
	organization: "org-iiOhwTUmOfhuctKWpkLmUjtw",
	apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.listen("3080", () => {
	console.log("Listening on port 3080");
});

//dummy route for testing
app.get("/", (req, res) => {
	res.send("Hello!");
});

//post route for requests
app.post("/", async (req, res) => {
	const { message } = req.body;
	try {
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `${message}`,
			max_tokens: 100,
			temperature: 0.5,
		});
		res.json({ message: response.data.choices[0].text });
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
});
