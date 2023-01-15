import React from 'react';

import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

import './contacts-search-bar.scss';

function ContactsSearchBar({ setSearchValue }) {
	const handleChange = (event) => {
		setSearchValue(event.target.value);
	};

	return (
		<div className="contacts-search-bar">
			<FaSearch className="search-icon" />
			<input
				onChange={(e) => handleChange(e)}
				className="contacts-search-input"
				type="text"
			/>
		</div>
	);
}

ContactsSearchBar.propTypes = {
	setSearchValue: PropTypes.func.isRequired,
};

export default ContactsSearchBar;
