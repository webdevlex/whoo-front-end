import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './menu-button.scss';

function MenuButton({ text, to, icon, extraClass = '' }) {
	return (
		<Link className={`nav-link ${extraClass}`} to={to}>
			{icon}
			<span className="menu-link-text">{text}</span>
		</Link>
	);
}

MenuButton.defaultProps = {
	extraClass: '',
};

MenuButton.propTypes = {
	text: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	icon: PropTypes.object.isRequired,
	extraClass: PropTypes.string,
};

export default MenuButton;
