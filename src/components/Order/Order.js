//Libraries
import React from "react";

//CSS
import classes from "./Order.module.css";

const Order = props => {
	const ingredients = [];

	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName]
		});
	}

	let ingredientsOutput = ingredients.map(ingredient => {
		return (
			<span
				key={ingredient.name}
				style={{
					textTransform: "capitalize",
					display: "inline-block",
					margin: "0 8px",
					border: "1px solid #ccc",
					padding: "5px"
				}}
			>
				{ingredient.name} ({ingredient.amount})
			</span>
		);
	});

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientsOutput}</p>
			<p>
				Price:{" "}
				<strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default Order;
