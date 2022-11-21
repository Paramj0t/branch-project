import mongoose from "mongoose";

const bracnhSchema = mongoose.Schema({
	ticketNumber: {
		type: Number,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	query: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		enum: ["pending", "closed"],
		default: "pending",
		required: true,
	},
	conversation: [
		{
			userName: {
				type: String,
				required: true,
			},
			message: {
				type: String,
				required: true,
			},
			timestamp: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

export default mongoose.model("tickets", bracnhSchema);
