import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import './sign-in.scss';
import logo from '../../assets/images/whoo-logo-with-text.svg';
import SigninForm from '../../components/signin-form/SigninForm';
import { clearAlerts } from '../../redux/actions/alert';

function SignIn({ isAuthenticated, isLoading, clearAlerts }) {
	useEffect(() => {
		return () => {
			clearAlerts();
		};
	}, []);

	if (!isLoading && isAuthenticated) {
		return <Navigate to='/edit-profile' />;
	}

	return (
		<div className='sign-in-page'>
			<div className='sign-in-container'>
				<img className='sign-in-logo' src={logo} alt='companylogo' />
				<h1 className='sign-in-title'>Welcome Back</h1>
				<span className='sign-in-sub-title'>
					Sign in to stay updated on your <br />
					professional world.
				</span>

				<SigninForm />
				<span className='not-member-text'>
					Not a member?&nbsp;
					<Link className='link' to='/sign-up'>
						Create Account.
					</Link>
				</span>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	isLoading: state.auth.isLoading,
});

SignIn.defaultProps = {
	isAuthenticated: false,
};

SignIn.propTypes = {
	isAuthenticated: PropTypes.bool,
	isLoading: PropTypes.bool.isRequired,
	clearAlerts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { clearAlerts })(SignIn);
