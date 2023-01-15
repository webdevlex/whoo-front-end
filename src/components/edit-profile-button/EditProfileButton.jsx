import React from 'react';

import PropTypes from 'prop-types';

import './edit-profile-button.scss';

function EditProfileButton({ text, selected, name, icon, clickFunc }) {
	return (
		<button
			type="button"
			className={`edit-profile-button ${selected === name && 'selected'}`}
			onClick={() => clickFunc(name)}
		>
			{icon}
			<p className="button-text">{text}</p>
		</button>
	);
}

EditProfileButton.propTypes = {
	text: PropTypes.string.isRequired,
	selected: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	icon: PropTypes.object.isRequired,
	clickFunc: PropTypes.func.isRequired,
};

export default EditProfileButton;
