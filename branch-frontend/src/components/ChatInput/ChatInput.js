import React, { useState } from "react";
import "./ChatInput.css";
import { useStateValue } from "../../StateProvider";
import axios from "../../axios";

function ChatInput({ ticketId }) {
	const [input, setInput] = useState("");
	const [{ user }] = useStateValue();

	const sendMessage = (e) => {
		e.preventDefault();

		if (ticketId) {
			if (input.length !== 0 && input.trim() !== "") {
				axios.post(`/new/message?id=${ticketId}`, {
					message: input,
					timestamp: Date.now(),
					userName: user.displayName,
				});
			}
		}
		setInput("");
	};
	return (
		<div className="chatInput">
			<form>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={"Message"}
				/>
				<button type="sumbit" onClick={sendMessage}>
					SEND
				</button>
			</form>
		</div>
	);
}

export default ChatInput;
