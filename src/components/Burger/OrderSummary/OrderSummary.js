//Libraries
import React, { Component } from "react";

//Components
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map(
			key => {
				return (
					<li key={key}>
						<span style={{ textTransform: "capitalize" }}>
							{key}
						</span>
						: {this.props.ingredients[key]}
					</li>
				);
			}
		);

		return (
			<Auxiliary>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>
					<strong>Total Price: ${this.props.price.toFixed(2)}</strong>
				</p>
				<p>Continue to checkout?</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>
					Cancel
				</Button>
				<Button
					btnType="Success"
					clicked={this.props.purchaseContinued}
				>
					Continue
				</Button>
			</Auxiliary>
		);
	}
}

export default OrderSummary;
