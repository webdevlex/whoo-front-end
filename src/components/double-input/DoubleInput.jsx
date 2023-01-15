import React from 'react';

import PropTypes from 'prop-types';

import './double-input.scss';
import InputContainer from '../input-container/InputContainer';

function DoubleInput({ text1, name1, error1, text2, name2, register, error2 }) {
	return (
		<div className="double-input">
			<InputContainer
				text={text1}
				name={name1}
				register={register}
				error={error1}
			/>
			<InputContainer
				text={text2}
				name={name2}
				register={register}
				error={error2}
			/>
		</div>
	);
}

DoubleInput.defaultProps = {
	error1: false,
	error2: false,
};

DoubleInput.propTypes = {
	text1: PropTypes.string.isRequired,
	name1: PropTypes.string.isRequired,
	error1: PropTypes.bool,
	text2: PropTypes.string.isRequired,
	name2: PropTypes.string.isRequired,
	error2: PropTypes.bool,
	register: PropTypes.func.isRequired,
};

export default DoubleInput;
