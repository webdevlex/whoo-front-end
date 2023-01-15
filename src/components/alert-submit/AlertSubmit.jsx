/* eslint-disable */
import React from 'react';

import './alert-submit.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Alerts from '../alerts/Alerts';
import ComponentLoading from '../component-loading/ComponentLoading';

function AlertSubmit({ saveProfileLoading }) {
	return (
		<div className="alerts-submit-container">
			<Alerts />
			{saveProfileLoading && <ComponentLoading />}
			<div className="edit-section-title-buttons-wrapper">
				<input type="submit" className="save-button" value="Save" />
			</div>
		</div>
	);
}

AlertSubmit.propTypes = {
	saveProfileLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	saveProfileLoading: state.profile.saveProfileLoading,
});

export default connect(mapStateToProps, {})(AlertSubmit);
