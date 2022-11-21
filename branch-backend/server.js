import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from "pusher";
import mongoData from "./mongoData.js";
import * as dotenv from "dotenv";
dotenv.config();

//Getting from environment variables

// app config
const app = express();
const port = process.env.port || 8000;

const pusher = new Pusher({
	appId: `${process.env.APP_ID}`,
	key: `${process.env.KEY}`,
	secret: `${process.env.SECRET}`,
	cluster: "ap2",
	useTLS: true,
});

// middlewares
app.use(cors());
app.use(express.json());

// db config
const mongoURI = `${process.env.MONGO_URI}`;

mongoose.connect(mongoURI, {
	useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
	console.log("DB Connected");

	const ticketCollection = mongoose.connection.collection("tickets");
	const changeStream = ticketCollection.watch();

	changeStream.on("change", (change) => {
		// console.log("A change occured", change);

		if (change.operationType === "insert") {
			pusher.trigger("tickets", "newTicket", {
				chnage: change,
			});
		} else if (change.operationType === "update") {
			pusher.trigger("conversation", "newMessage", {
				change: change,
			});
		} else {
			console.log("Error triggering Pusher");
		}
	});
});

// api routes
app.get("/", (req, res) => res.status(200).send("Hey"));

app.post("/new/ticket", (req, res) => {
	const dbData = req.body;

	mongoData.create(dbData, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.post("/new/message", (req, res) => {
	const id = req.query.id;
	const newMessage = req.body;

	mongoData.updateOne(
		{
			_id: id,
		},
		{
			$push: { conversation: newMessage },
		},
		(err, data) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(201).send(data);
			}
		}
	);
});

app.get("/get/ticketList", (req, res) => {
	mongoData.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			let tickets = [];

			data.map((ticketData) => {
				const ticketInfo = {
					id: ticketData._id,
					ticketNumber: ticketData.ticketNumber,
					userName: ticketData.userName,
					query: ticketData.query,
					timestamp: ticketData.timestamp,
					status: ticketData.status,
					conversation: ticketData.conversation,
				};

				tickets.push(ticketInfo);
			});

			res.status(200).send(tickets);
		}
	});
});

app.get("/get/conversation", (req, res) => {
	const id = req.query.id;

	mongoData.find({ _id: id }, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

app.post("/update/ticket", (req, res) => {
	const id = req.query.id;

	mongoData.updateOne(
		{
			_id: id,
		},
		{
			$set: { status: "closed" },
		},
		(err, data) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.status(201).send(data);
			}
		}
	);
});

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
