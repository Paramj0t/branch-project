export const initialState = {
	user: null,
	bot: null,
};

export const actionTypes = {
	SET_USER: "SET_USER",
	SET_BOT: "SET_BOT",
};

const reducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_USER:
			return {
				...state,
				user: action.user,
			};
		case actionTypes.SET_BOT:
			return {
				...state,
				bot: action.bot,
			};
		default:
			return state;
	}
};

export default reducer;
