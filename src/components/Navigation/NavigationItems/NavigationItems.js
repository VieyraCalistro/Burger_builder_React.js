//Libraries
import React from "react";

//CSS
import classes from "./NavigationItems.module.css";

//Components
import NavigationItem from "./NavigationItem/NavigationItem";

//active prop is a boolean and we can just pass in like so we don't have to be explicit like active={true}.
const NavigationItems = props => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/">Burger Builder</NavigationItem>
			{props.isAuthenticated ? (
				<NavigationItem link="/orders">Orders</NavigationItem>
			) : null}
			{props.isAuthenticated ? (
				<NavigationItem link="/logout">Logout</NavigationItem>
			) : (
				<NavigationItem link="/auth">Authenticate</NavigationItem>
			)}
		</ul>
	);
};

export default NavigationItems;
