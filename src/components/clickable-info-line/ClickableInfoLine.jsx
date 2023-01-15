import React from 'react';

import './clickable-info-line.scss';
import PropTypes from 'prop-types';

function ClickableInfoLine({ title, info }) {
	return (
		<div className='info-line'>
			<p className='info-line-title'>{`${title}:`}</p>
			<a
				href={`http://${info}`}
				target='_blank'
				className='info-line-user-info color clickable'>
				{info}
			</a>
		</div>
	);
}

ClickableInfoLine.defaultProps = {
	color: '',
};

ClickableInfoLine.propTypes = {
	title: PropTypes.string.isRequired,
	info: PropTypes.string.isRequired,
	color: PropTypes.string,
};

export default ClickableInfoLine;
