import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	auth: authReducer
});

// process.env.NODE_ENV ternary expression is there to
//prevent people from being able to use redux with your
//application once it is in production.
const composeEnhancers =
	process.env.NODE_ENV === "development"
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
