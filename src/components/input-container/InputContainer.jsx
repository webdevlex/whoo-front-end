import React from 'react';

import PropTypes from 'prop-types';

import './input-container.scss';

function InputContainer({ text, name, register, error = false }) {
	return (
		<div className="input-container">
			<span className="label">{text}</span>
			<input
				type="text"
				className="input"
				aria-invalid={error}
				{...register(name)}
			/>
		</div>
	);
}

InputContainer.defaultProps = {
	error: false,
};

InputContainer.propTypes = {
	text: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	register: PropTypes.func.isRequired,
	error: PropTypes.bool,
};

export default InputContainer;
