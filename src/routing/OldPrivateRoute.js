/* eslint-disable */
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, isLoading },
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			!isAuthenticated && !isLoading ? (
				<Navigate to="sign-in" />
			) : (
				<Component {...props} />
			)
		}
	/>
);

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);
