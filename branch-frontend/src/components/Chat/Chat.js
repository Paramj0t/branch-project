import React, { useState, useEffect } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { StarBorderOutlined } from "@mui/icons-material";
import Message from "../Message/Message";
import ChatInput from "../ChatInput/ChatInput";
import axios from "../../axios";
import Pusher from "pusher-js";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../StateProvider";

const pusher = new Pusher("22fa5512c1be04316e23", {
	cluster: "ap2",
});

const Chat = () => {
	const { ticketId } = useParams();
	const [ticketNumber, setTicketNumber] = useState(null);
	const [roomMessages, setRoomMessages] = useState([]);
	const navigate = useNavigate();
	const [{ user, bot }] = useStateValue();

	const getConvo = () => {
		axios.get(`/get/conversation?id=${ticketId}`).then((res) => {
			setTicketNumber(res.data[0].ticketNumber);
			setRoomMessages(res.data[0].conversation);
		});
	};

	const closeTicket = () => {
		navigate("/tickets");

		if (ticketId) {
			axios.post(`/update/ticket?id=${ticketId}`, {});
			axios.post(`/new/message?id=${ticketId}`, {
				message: "TICKET CLOSED",
				timestamp: Date.now(),
				userName: "BOT",
			});
		}
	};

	useEffect(() => {
		if (ticketId) {
			getConvo();

			const channel = pusher.subscribe("conversation");
			channel.bind("newMessage", function (data) {
				getConvo();
			});
		}
	}, [ticketId]);

	return (
		<div className="chat">
			<div className="chat__header">
				<div className="chat__headerLeft">
					<h4 className="chat__ticketName">
						<strong> Ticket Number - {ticketNumber} </strong>
						<StarBorderOutlined />
					</h4>
				</div>

				<div className="chat__headerRight">
					{bot !== "BOT" && <button onClick={closeTicket}>Close Ticket</button>}
				</div>
			</div>

			<div className="chat__messages">
				{roomMessages.map(({ _id, message, timestamp, userName }) => (
					<Message
						message={message}
						timestamp={timestamp}
						userName={userName}
						key={_id}
					/>
				))}
			</div>

			{bot === "BOT" ? (
				<div className="chat__closed">
					<h5>TICKET HAS BEEN CLOSED</h5>
				</div>
			) : (
				<ChatInput ticketId={ticketId} className="chat__input" />
			)}
		</div>
	);
};

export default Chat;
