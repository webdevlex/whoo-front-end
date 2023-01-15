import React, { useEffect } from 'react';

import './sign-up.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import logo from '../../assets/images/whoo-logo-with-text.svg';
import SignupForm from '../../components/signup-form/SignupFrom';
import { setAlert, clearAlerts } from '../../redux/actions/alert';

function SignUp({ isAuthenticated, clearAlerts }) {
	useEffect(() => {
		return () => {
			clearAlerts();
		};
	}, []);

	if (isAuthenticated) {
		return <Navigate to='/edit-profile' />;
	}

	return (
		<div className='sign-up-page'>
			<div className='sign-up-container'>
				<img className='sign-up-logo' src={logo} alt='logo' />
				<h1 className='sign-up-title'>Join Us</h1>
				<span className='sign-up-sub-title'>Work better, safer, together.</span>
				<SignupForm />
				<span className='have-account-text'>
					Already have an account?&nbsp;
					<Link className='link' to='/sign-in'>
						Sign In.
					</Link>
				</span>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

SignUp.defaultProps = {
	isAuthenticated: false,
};

SignUp.propTypes = {
	isAuthenticated: PropTypes.bool,
	clearAlerts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
	setAlert,
	clearAlerts,
})(SignUp);
