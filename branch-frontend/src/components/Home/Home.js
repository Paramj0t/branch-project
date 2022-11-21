import React, { useEffect, useState } from "react";
import "./Home.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "../../axios";
import { useStateValue } from "../../StateProvider";
import Pusher from "pusher-js";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { actionTypes } from "../../reducer";

const pusher = new Pusher("22fa5512c1be04316e23", {
	cluster: "ap2",
});

const columns = [
	{ id: "ticketNumber", label: "Ticket Number", minWidth: 170 },
	{ id: "userName", label: "User Name", minWidth: 170 },
	{ id: "query", label: "Query", minWidth: 170 },
	{ id: "timestamp", label: "Time", minWidth: 170 },
	{ id: "status", label: "Status", minWidth: 100 },
];

const Home = () => {
	const [tickets, setTickets] = useState([]);
	const [{ user, bot }, dispatch] = useStateValue();
	const navigate = useNavigate();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const getTicketList = () => {
		axios.get("/get/ticketList").then((res) => {
			setTickets(res.data);
		});
	};

	const selectTicket = (id) => {
		axios.get(`/get/conversation?id=${id}`).then((res) => {
			dispatch({
				type: actionTypes.SET_BOT,
				bot: res.data[0].conversation[res.data[0].conversation.length - 1]
					.userName,
			});
		});

		navigate(`/ticket/${id}`);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	useEffect(() => {
		getTicketList();

		const channel = pusher.subscribe("tickets");
		channel.bind("newTicket", function (data) {
			getTicketList();
		});
	}, []);

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }} className="home">
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{tickets
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((ticket) => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={ticket.id}
										onClick={() => selectTicket(ticket.id)}
									>
										{columns.map((column) => {
											let value = ticket[column.id];
											if (column.id === "timestamp") {
												const dateObj = new Date(value);
												const momentObj = moment(dateObj);
												value = momentObj.format("HH:mm DD-MM-YYYY");
											}
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === "number"
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={tickets.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default Home;
