//Redux store
import * as actionTypes from "./actionTypes";

//Axios instance
import axiosOrders from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFail = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axiosOrders
			.post(
				"orders/" + orderData.userId + ".json?auth=" + token,
				orderData
			)
			.then(response => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(error => {
				dispatch(purchaseBurgerFail(error));
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
};

export const fetchOrdersFail = error => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};

export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axiosOrders
			.get(
				"/orders/" +
					userId +
					".json?auth=" +
					token +
					'&orderBy="userId"&equalTo="' +
					userId +
					'"'
			)
			.then(response => {
				let collectedOrders = [];
				for (let key in response.data) {
					collectedOrders.push({
						...response.data[key],
						id: key
					});
				}

				dispatch(fetchOrdersSuccess(collectedOrders));
			})
			.catch(error => {
				dispatch(fetchOrdersFail(error));
			});
	};
};
