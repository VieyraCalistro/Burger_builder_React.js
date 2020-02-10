//Libraries
import React from "react";

//Assets
import burgerLogo from "../../assets/images/burger-logo.png";

//CSS
import classes from "./Logo.module.css";

const Logo = props => {
	return (
		<div className={classes.Logo} style={{ height: props.height }}>
			<img alt="Logo" src={burgerLogo}></img>
		</div>
	);
};

export default Logo;
