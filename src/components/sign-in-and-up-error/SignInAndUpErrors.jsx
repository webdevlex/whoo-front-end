import React from 'react';

import './sign-in-and-up-errors.scss';
import PropTypes from 'prop-types';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { connect } from 'react-redux';

function SignInAndUpErrors({ alerts }) {
	const hasErrors = alerts.length > 0;
	return (
		hasErrors &&
		alerts.map(({ msg, alertType, id }) => (
			<div
				className={`alert ${alertType === 'error' ? 'error' : 'success'}`}
				key={id}
			>
				{alertType === 'error' ? (
					<FaExclamationCircle className="icon" />
				) : (
					<FaCheckCircle className="icon" />
				)}
				<p>{msg}</p>
			</div>
		))
	);
}

const mapStateToProps = (state) => ({
	alerts: state.alerts,
});

SignInAndUpErrors.propTypes = {
	alerts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(SignInAndUpErrors);
