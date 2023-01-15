import React from 'react';

import PropTypes from 'prop-types';
import './add-contact-button.scss';
import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';

import { addUserAsContact } from '../../redux/actions/contacts';

function AddContactButton({ username, addUserAsContact, text }) {
	const handleClick = (username) => {
		addUserAsContact(username);
	};

	const handleKeyDown = ({ keyCode }, username) => {
		const ENTER_KEY_CODE = 13;
		if (keyCode === ENTER_KEY_CODE) {
			addUserAsContact(username);
		}
	};

	return (
		<button
			type="button"
			className="add-contact-button"
			onClick={() => handleClick(username)}
			onKeyDown={(e) => handleKeyDown(e, username)}
		>
			{text && <p className="profile-button-text">{text}</p>}
			<FaPlus className="profile-button-icon" />
		</button>
	);
}

const mapStateToProps = (state, ownProps) => ({
	state,
	username: ownProps.username,
});

AddContactButton.defaultProps = {
	text: '',
};

AddContactButton.propTypes = {
	username: PropTypes.string.isRequired,
	addUserAsContact: PropTypes.func.isRequired,
	text: PropTypes.string,
};

export default connect(mapStateToProps, { addUserAsContact })(AddContactButton);
