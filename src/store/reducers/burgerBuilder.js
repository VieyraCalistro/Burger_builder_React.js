//Redux store
import * as actionType from "../actions/actionTypes";

//Utility
import { updateObject } from "../../shared/utility";

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	building: false
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

const addIngredient = (state, action) => {
	const updatedIngredient = {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1
	};
	const updatedIngredients = updateObject(
		state.ingredients,
		updatedIngredient
	);
	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		building: true
	};
	return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
	const updatedIngr = {
		[action.ingredientName]: state.ingredients[action.ingredientName] - 1
	};
	const updatedIngrs = updateObject(state.ingredients, updatedIngr);
	const stateUpdated = {
		ingredients: updatedIngrs,
		totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
		building: true
	};
	return updateObject(state, stateUpdated);
};

const setIngredients = (state, action) => {
	return updateObject(state, {
		...state,
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat
		},
		error: false,
		totalPrice: 4,
		building: false
	});
};

const fetchIngredientsFailed = (state, action) => {
	return updateObject(state, { error: true });
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.ADD_INGREDIENT:
			return addIngredient(state, action);

		case actionType.REMOVE_INGREDIENT:
			return removeIngredient(state, action);

		case actionType.SET_INGREDIENTS:
			return setIngredients(state, action);

		case actionType.FETCH_INGREDIENTS_FAILED:
			return fetchIngredientsFailed(state, action);

		default:
			return state;
	}
};

export default Reducer;
