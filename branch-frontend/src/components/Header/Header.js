import React from "react";
import "./Header.css";
import { Avatar } from "@mui/material";
import { useStateValue } from "../../StateProvider";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase";
import { actionTypes } from "../../reducer";

const Header = () => {
	const [{ user }, dispatch] = useStateValue();
	const navigate = useNavigate();

	const navigateBackToHome = () => {
		navigate("/tickets");
	};

	const logout = () => {
		auth
			.signOut(provider)
			.then(() => {
				dispatch({
					type: actionTypes.SET_USER,
					user: null,
				});
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div className="header">
			<div className="header__left" onClick={navigateBackToHome}>
				<img src="/Branch.jpeg" alt="Branch" />
			</div>

			<div className="header__right">
				<Avatar
					className="header__avatar"
					src={user?.photoURL}
					alt={user?.displayName}
				/>
				<h3 onClick={logout}>{user?.displayName}</h3>
			</div>
		</div>
	);
};

export default Header;
