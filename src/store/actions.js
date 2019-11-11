export const authorization = (dispatch) => ({
	authorization: (val) => {
		dispatch({type: "AUTHORIZATION", payload: val});
	}
});
