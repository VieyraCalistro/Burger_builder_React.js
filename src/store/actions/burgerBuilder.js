//Redux store
import * as actionTypes from "./actionTypes";

//Axios instance
import axiosOrders from "../../axios-orders";

export const addIngredient = ingName => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: ingName
	};
};

export const removeIngredient = ingName => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: ingName
	};
};

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	};
};

export const initIngredients = () => {
	return dispatch => {
		axiosOrders
			.get("ingredients.json")
			.then(response => {
				dispatch(setIngredients(response.data));
			})
			.catch(error => {
				dispatch(fetchIngredientsFailed());
			});
	};
};
