//Libraries
import React from "react";

//CSS
import classes from "./DrawerToggle.module.css";

const DrawerToggle = props => {
	return (
		<div className={classes.DrawerToggle} onClick={props.clicked}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default DrawerToggle;
