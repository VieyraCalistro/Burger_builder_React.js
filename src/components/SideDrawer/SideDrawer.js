//Libraries
import React from "react";

//Components
import Logo from "../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import Backdrop from "../UI/Backdrop/Backdrop";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

//CSS
import classes from "./SideDrawer.module.css";

//You can make an instance of a css class in another css file by calling
//it the same name, it will then act like the spread operator and copy over all
//of its previous settings without doing anything and now you can modify it to your needs.
const SideDrawer = props => {
	let attachedClasses = [classes.SideDrawer, classes.Close];

	if (props.open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<Auxiliary>
			<Backdrop show={props.open} clicked={props.close} />
			<div className={attachedClasses.join(" ")} onClick={props.close}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuthenticated={props.isAuth} />
				</nav>
			</div>
		</Auxiliary>
	);
};

export default SideDrawer;
