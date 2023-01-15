import React from 'react';

import PropTypes from 'prop-types';

import './nested-double-input.scss';
import InputContainer from '../input-container/InputContainer';

function NestedDoubleInput({
	text1,
	name1,
	text2,
	name2,
	text3,
	name3,
	register,
}) {
	return (
		<div className="double-input">
			<InputContainer text={text1} name={name1} register={register} />
			<div className="nested-double-input">
				<InputContainer text={text2} name={name2} register={register} />
				<InputContainer text={text3} name={name3} register={register} />
			</div>
		</div>
	);
}

NestedDoubleInput.propTypes = {
	text1: PropTypes.string.isRequired,
	name1: PropTypes.string.isRequired,
	text2: PropTypes.string.isRequired,
	name2: PropTypes.string.isRequired,
	text3: PropTypes.string.isRequired,
	name3: PropTypes.string.isRequired,
	register: PropTypes.func.isRequired,
};

export default NestedDoubleInput;
