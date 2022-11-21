import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
	Navigate,
} from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import { useStateValue } from "./StateProvider";
import Home from "./components/Home/Home";

function App() {
	const [{ user }] = useStateValue();

	return (
		<div className="app">
			<Router>
				{!user ? (
					<>
						<Switch>
							<Route path="/login" element={<Login />} />
							<Route path="*" element={<Navigate replace to="/login" />} />
						</Switch>
					</>
				) : (
					<>
						<Header />
						<div className="app__body">
							<Switch>
								<Route path="/ticket/:ticketId" element={<Chat />} />
								<Route path="/tickets" element={<Home />} />
								<Route path="*" element={<Navigate replace to="/tickets" />} />
							</Switch>
						</div>
					</>
				)}
			</Router>
		</div>
	);
}

export default App;
