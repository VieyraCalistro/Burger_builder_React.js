//Redux store
import * as actionType from "../actions/actionTypes";

//Utility
import { updateObject } from "../../shared/utility";

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: null,
	authRedirectPath: "/"
};

const authStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.idToken,
		userId: action.userId,
		error: null,
		loading: false
	});
};

const authFail = (state, action) => {
	return updateObject(state, {
		loading: false,
		error: action.error
	});
};

const authLogout = (state, action) => {
	return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
	return updateObject(state, { authRedirectPath: action.path });
};

const Auth = (state = initialState, action) => {
	switch (action.type) {
		case actionType.AUTH_START:
			return authStart(state, action);
		case actionType.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionType.AUTH_FAIL:
			return authFail(state, action);
		case actionType.AUTH_LOGOUT:
			return authLogout(state, action);
		case actionType.SET_AUTH_REDIRECT_PATH:
			return setAuthRedirectPath(state, action);
		default:
			return state;
	}
};

export default Auth;
