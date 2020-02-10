//Libraries
import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import Auxiliary from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";

//CSS
import classes from "./Layout.module.css";

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	sideDrawerClosedHandler = () => {
		this.setState({
			showSideDrawer: false
		});
	};

	sideDrawerTogglerHandler = () => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<Auxiliary>
				<Toolbar
					isAuth={this.props.isAuthenticated}
					drawerToggleClicked={this.sideDrawerTogglerHandler}
				/>
				<SideDrawer
					isAuth={this.props.isAuthenticated}
					open={this.state.showSideDrawer}
					close={this.sideDrawerClosedHandler}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</Auxiliary>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

export default connect(mapStateToProps)(Layout);
