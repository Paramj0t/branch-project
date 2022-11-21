import React from "react";
import "./Message.css";
import moment from "moment";

function Message({ message, timestamp, userName }) {
	const dateObj = new Date(timestamp);
	const momentObj = moment(dateObj);
	timestamp = momentObj.format("HH:mm DD-MM-YYYY");

	return (
		<div className="message">
			<div className="message__info">
				<h4>
					{userName} <span className="message__timestamp">{timestamp}</span>
				</h4>
				<p>{message}</p>
			</div>
		</div>
	);
}

export default Message;
