//Libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//Components
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

//CSS
import classes from "./Auth.module.css";

//Redux store
import * as actions from "../../store/actions/index";

//Utility
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Email Address"
				},
				value: "",
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Password"
				},
				value: "",
				validation: {
					required: true,
					minLength: 6 // <---This is the actual minLength required by firebase for a password.
				},
				valid: false,
				touched: false
			}
		},
		isSignUp: true
	};

	componentDidMount() {
		if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
			this.props.onSetAuthRedirectPath();
		}
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true
			})
		});

		this.setState({ controls: updatedControls });
	};

	submitHandler = event => {
		event.preventDefault();

		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignUp
		);
	};

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return { isSignUp: !prevState.isSignUp };
		});
	};

	render() {
		const fromElementsArray = [];

		for (let key in this.state.controls) {
			fromElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		let form = fromElementsArray.map(element => {
			return (
				<Input
					key={element.id}
					elementType={element.config.elementType}
					elementConfig={element.config.elementConfig}
					value={element.config.value}
					invalid={!element.config.valid}
					shouldValidate={element.config.validation}
					touched={element.config.touched}
					changed={event =>
						this.inputChangedHandler(event, element.id)
					}
				/>
			);
		});

		if (this.props.loading) {
			form = <Spinner />;
		}

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = this.props.error.message;
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button btnType="Danger" clicked={this.switchAuthModeHandler}>
					SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) =>
			dispatch(actions.auth(email, password, isSignUp)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
