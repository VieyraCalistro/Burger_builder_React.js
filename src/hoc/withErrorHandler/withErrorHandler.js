//Libraries
import React, { Component } from "react";

//Components
import Auxiliary from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const WithErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		//The constructor acts like componentWillMount() lifecycle hook
		constructor(props) {
			super(props);

			this.state = {
				error: null
			};

			this.requestInterceptor = axios.interceptors.request.use(
				request => {
					this.setState({
						error: null
					});

					return request;
				}
			);

			this.responseInterceptor = axios.interceptors.response.use(
				response => response,
				error => {
					this.setState({
						error: error
					});
				}
			);
		}

		componentWillUnmount() {
			//Delete memory leaks
			axios.interceptors.request.eject(this.requestInterceptor);
			axios.interceptors.response.eject(this.responseInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({
				error: null
			});
		};

		render() {
			return (
				<Auxiliary>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Auxiliary>
			);
		}
	};
};

export default WithErrorHandler;
