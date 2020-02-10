//Libraries
import React from "react";

//CSS
import classes from "./BuildControls.module.css";

//Components
import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" }
];

const buildControls = props => (
	<div className={classes.BuildControls}>
		<p>
			Current price: <strong>{props.price.toFixed(2)}</strong>
		</p>
		{controls.map(ctrl => {
			return (
				<BuildControl
					key={ctrl.label}
					label={ctrl.label}
					added={props.ingredientAdded.bind(this, ctrl.type)}
					removed={props.ingredientRemoved.bind(this, ctrl.type)}
					disabledCtrl={props.disabled[ctrl.type]}
				/>
			);
		})}
		<button
			className={classes.OrderButton}
			disabled={!props.purchasable}
			onClick={props.ordered}
		>
			{props.isAuth ? "Order Now" : "Sign up to order"}
		</button>
	</div>
);

export default buildControls;
