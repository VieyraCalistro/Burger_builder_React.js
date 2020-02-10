//Libraries
import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

//CSS
import classes from "./ContactData.module.css";

//Redux store
import * as actions from "../../../store/actions/index";

//Axios instance
import axiosOrders from "../../../axios-orders";

//Utility
import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipcode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Zip Code"
				},
				value: "",
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
					isNumeric: true
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your e-mail"
				},
				value: "",
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "Fastest", displayValue: "Fastest" },
						{ value: "Cheapest", displayValue: "Cheapest" }
					]
				},
				value: "Fastest",
				validation: {},
				valid: true
			}
		},

		formIsValid: false
	};

	orderHandler = event => {
		event.preventDefault();

		this.setState({
			loading: true
		});

		let orderForm = {};
		for (let formElementIdentifier in this.state.orderForm) {
			orderForm[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}

		const order = {
			ingredients: this.props.ingr,
			price: this.props.price.toFixed(2),
			orderData: orderForm,
			userId: this.props.userId
		};

		this.props.onOrderBurger(order, this.props.token);
	};

	inputChangedHandler = (event, identifier) => {
		const updatedFormElement = updateObject(
			this.state.orderForm[identifier],
			{
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.orderForm[identifier].validation
				),
				touched: true
			}
		);
		const updatedOrderForm = updateObject(this.state.orderForm, {
			[identifier]: updatedFormElement
		});

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid =
				updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid
		});
	};

	render() {
		const fromElementsArray = [];

		for (let key in this.state.orderForm) {
			fromElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{fromElementsArray.map(element => {
					return (
						<Input
							key={element.id}
							elementType={element.config.elementType}
							elementConfig={element.config.elementConfig}
							value={element.config.value}
							invalid={!element.config.valid}
							shouldValidate={element.config.validation}
							touched={element.config.touched}
							changed={event =>
								this.inputChangedHandler(event, element.id)
							}
						/>
					);
				})}

				<Button btnType="Success" disabled={!this.state.formIsValid}>
					Order
				</Button>
			</form>
		);

		if (this.props.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact information</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ingr: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData, token) =>
			dispatch(actions.purchaseBurger(orderData, token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axiosOrders));
