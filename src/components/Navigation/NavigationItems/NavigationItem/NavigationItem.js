//Libraries
import React from "react";
import { NavLink } from "react-router-dom";

//CSS
import classes from "./NavigationItem.module.css";

const NavigationItem = props => {
	return (
		<li className={classes.NavigationItem}>
			<NavLink exact activeClassName={classes.active} to={props.link}>
				{props.children}
			</NavLink>
		</li>
	);
};

export default NavigationItem;
