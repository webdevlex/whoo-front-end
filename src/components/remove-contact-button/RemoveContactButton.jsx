import React from 'react';

import './remove-contact-button.scss';
import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux';

import { removeContact } from '../../redux/actions/contacts';

function RemoveContactButton({ username, removeContact, text }) {
	const handleClick = (username) => {
		removeContact(username);
	};

	const handleKeyDown = ({ keyCode }, username) => {
		const ENTER_KEY_CODE = 13;
		if (keyCode === ENTER_KEY_CODE) {
			removeContact(username);
		}
	};

	return (
		<button
			type="button"
			className="remove-contact-button"
			onClick={() => handleClick(username)}
			onKeyDown={(e) => handleKeyDown(e, username)}
		>
			{text && <p className="profile-button-text">{text}</p>}
			<FaTrashAlt className="profile-button-icon" />
		</button>
	);
}

const mapStateToProps = (state, ownProps) => ({
	state,
	username: ownProps.username,
});

RemoveContactButton.defaultProps = {
	text: '',
};

RemoveContactButton.propTypes = {
	username: PropTypes.string.isRequired,
	removeContact: PropTypes.func.isRequired,
	text: PropTypes.string,
};

export default connect(mapStateToProps, { removeContact })(RemoveContactButton);
