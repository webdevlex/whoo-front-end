import React from 'react';

import './info-line.scss';
import PropTypes from 'prop-types';

function InfoLine({ title, info, color = '' }) {
	return (
		<div className="info-line">
			<p className="info-line-title">{`${title}:`}</p>
			<p className={`info-line-user-info ${color}`}>{info}</p>
		</div>
	);
}

InfoLine.defaultProps = {
	color: '',
};

InfoLine.propTypes = {
	title: PropTypes.string.isRequired,
	info: PropTypes.string.isRequired,
	color: PropTypes.string,
};

export default InfoLine;
