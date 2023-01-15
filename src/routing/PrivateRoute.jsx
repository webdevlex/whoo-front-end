import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, auth }) {
	const { isAuthenticated, isLoading } = auth;
	const authorized = isAuthenticated && !isLoading;
	return authorized ? children : <Navigate to="/sign-in" />;
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

PrivateRoute.propTypes = {
	children: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(PrivateRoute);
