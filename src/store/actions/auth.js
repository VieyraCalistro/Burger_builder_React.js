//Redux store
import * as actionTypes from "./actionTypes";

//Libraries
import axios from "axios";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const authLogout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userId");
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(authLogout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart());

		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};

		let url =
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYajE1Sl9EB9cbEw7feTzYsjFDyzcBzLY";

		if (!isSignUp) {
			url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYajE1Sl9EB9cbEw7feTzYsjFDyzcBzLY";
		}

		axios
			.post(url, authData)
			.then(response => {
				// Calculating the date, and wrapped around a new date to get back a object
				// new Date() will create a date passed inside of it.
				const expirationDate = new Date(
					new Date().getTime() + response.data.expiresIn * 1000
				);
				localStorage.setItem("token", response.data.idToken);
				localStorage.setItem("expirationDate", expirationDate);
				localStorage.setItem("userId", response.data.localId);
				dispatch(
					authSuccess(response.data.idToken, response.data.localId)
				);

				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(error => {
				dispatch(authFail(error.response.data.error));
			});
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(authLogout());
		} else {
			const expirationDate = new Date(
				localStorage.getItem("expirationDate")
			);

			if (expirationDate <= new Date()) {
				dispatch(authLogout());
			} else {
				const userId = localStorage.getItem("userId");
				dispatch(authSuccess(token, userId));

				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
	};
};
