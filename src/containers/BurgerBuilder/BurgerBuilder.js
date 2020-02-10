//Libraries
import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

//Redux store
import * as actions from "../../store/actions/index";

//Axios instance
import axiosOrders from "../../axios-orders";

export class BurgerBuilder extends Component {
	state = {
		purchasing: false
	};

	componentDidMount() {
		this.props.initIngredients();
	}

	updatePurchasableState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(key => {
				return ingredients[key];
			})
			.reduce((total, value) => {
				return (total = total + value);
			}, 0);

		return sum > 0;
	}

	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({
				purchasing: true
			});
		} else {
			this.props.setAuthRedirectPath("/checkout");
			this.props.history.push("/auth");
		}
	};

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		});
	};

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push("/checkout");
	};

	render() {
		let disabledInfo = {
			...this.props.ingr
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let burger = this.props.err ? (
			<p style={{ textAlign: "center", fontSize: "24px" }}>
				<strong>The ingredients can not be loaded!</strong>
			</p>
		) : (
			<Spinner />
		);

		let orderSummary = null;

		if (this.props.ingr) {
			burger = (
				<Auxiliary>
					<Burger ingredients={this.props.ingr} />
					<BuildControls
						isAuth={this.props.isAuthenticated}
						ingredientAdded={this.props.addIngredientHandler}
						ingredientRemoved={this.props.removeIngredientHandler}
						disabled={disabledInfo}
						price={this.props.totalPrice}
						purchasable={this.updatePurchasableState(
							this.props.ingr
						)}
						ordered={this.purchaseHandler}
					/>
				</Auxiliary>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.props.ingr}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.props.totalPrice}
				/>
			);
		}

		return (
			<Auxiliary>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

const mapStateToProps = state => {
	return {
		ingr: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		err: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addIngredientHandler: ingName =>
			dispatch(actions.addIngredient(ingName)),
		removeIngredientHandler: ingName =>
			dispatch(actions.removeIngredient(ingName)),
		initIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		setAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosOrders));
