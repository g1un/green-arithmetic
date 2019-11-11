let initialState = {
  authorized: false,
};

function reducer(state = initialState, action) {
	switch(action.type) {
		case "AUTHORIZATION":
			return {
				...state,
				authorized: action.payload,
			};
		default:
			return state;
	}
}

export default reducer;
