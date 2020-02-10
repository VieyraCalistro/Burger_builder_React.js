//Libraries
import React from "react";

//Components
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

//CSS
import classes from "./Burger.module.css";

const burger = props => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map(igrKey => {
			return [...Array(props.ingredients[igrKey])].map((_, i) => {
				return <BurgerIngredients key={igrKey + i} type={igrKey} />;
			});
		})
		.reduce((total, value) => {
			return total.concat(value);
		}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients!</p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredients type="bread-top"></BurgerIngredients>
			{transformedIngredients}
			<BurgerIngredients type="bread-bottom"></BurgerIngredients>
		</div>
	);
};

export default burger;
