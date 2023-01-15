import React from 'react';

import './alerts.scss';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { connect } from 'react-redux';

function Alerts({ alerts, error, usernameTaken, testProfile }) {
	let errorMessage;
	if (usernameTaken) {
		errorMessage = 'Username Taken';
	} else if (testProfile) {
		errorMessage = 'Test Profile';
	} else {
		errorMessage = error;
	}

	return (
		<div className='alert-container'>
			{alerts && (
				<div className='profile-alert'>
					{alerts}
					<FaCheckCircle className='icon' />
				</div>
			)}
			{error && (
				<div className='error-alert'>
					{errorMessage}
					<FaExclamationCircle className='icon' />
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	alerts: state.profile.alerts,
	error: state.profile.error,
	usernameTaken: state.errors.usernameTaken,
	testProfile: state.errors.testProfile,
});

Alerts.propTypes = {
	alerts: PropTypes.string.isRequired,
	error: PropTypes.string.isRequired,
	usernameTaken: PropTypes.bool.isRequired,
	testProfile: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {})(Alerts);
