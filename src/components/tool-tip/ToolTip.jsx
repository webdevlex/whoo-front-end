import React from 'react';
import './tool-tip.scss';

import PropTypes from 'prop-types';

export default function ToolTip({ text }) {
	return (
		<div className="tool-tip">
			<p>{text}</p>
		</div>
	);
}

ToolTip.propTypes = {
	text: PropTypes.string.isRequired,
};
