import React from 'react';

import './section-title.scss';
import PropTypes from 'prop-types';

import AlertSubmit from '../alert-submit/AlertSubmit';

function SectionTitle({ text }) {
	return (
		<div className="edit-section-title-container">
			<h1 className="edit-section-title">{text}</h1>
			<AlertSubmit />
		</div>
	);
}

SectionTitle.propTypes = {
	text: PropTypes.string.isRequired,
};

export default SectionTitle;
