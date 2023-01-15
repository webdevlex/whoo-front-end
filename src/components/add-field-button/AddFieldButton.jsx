import React from 'react';

import './add-field-button.scss';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';

function AddFieldButton({ onClickFunc }) {
	return (
		<button type="button" className="add-fields-button" onClick={onClickFunc}>
			<FaPlus className="plus-icon" />
		</button>
	);
}

AddFieldButton.propTypes = {
	onClickFunc: PropTypes.func.isRequired,
};

export default AddFieldButton;
