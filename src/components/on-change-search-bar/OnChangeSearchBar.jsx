import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import './on-change-search-bar.scss';
import { typeRequest, setSearchValue } from '../../redux/actions/search';

function OnChangeSearchBar({ searchValue, typeRequest, setSearchValue }) {
	const [searchRequested, setSearchRequested] = useState(false);
	const location = useLocation();
	const { pathname } = location;
	const alreadyOnBrowsePage = pathname === '/browse';

	const { register, handleSubmit } = useForm();

	const onSubmit = (formData) => {
		const searchBarHasValue = formData.searchBar;
		if (searchBarHasValue) {
			setSearchValue(formData);
			setSearchRequested(true);
		}
	};

	const handleChange = (event) => {
		const newTextInput = event.target.value;

		typeRequest(newTextInput);
	};

	if (searchRequested && !alreadyOnBrowsePage) {
		return <Navigate to="/browse" />;
	}

	return (
		<div className="on-change-search-bar">
			<FaSearch className="magnifying-glass-icon" />
			<form
				className="on-change-search-bar-form"
				onSubmit={handleSubmit(onSubmit)}
				onChange={(e) => handleChange(e)}
			>
				<input
					className="search-bar-input"
					type="text"
					defaultValue={alreadyOnBrowsePage ? searchValue : ''}
					{...register('searchBar', { required: true })}
				/>
				<button type="submit" className="search-bar-submit-button">
					<FaArrowRight className="arrow-pointing-right-icon" />
				</button>
			</form>
		</div>
	);
}

const mapStateToProps = (state) => ({
	searchValue: state.search.searchValue,
});

OnChangeSearchBar.defaultProps = {
	searchValue: '',
};

OnChangeSearchBar.propTypes = {
	searchValue: PropTypes.string,
	typeRequest: PropTypes.func.isRequired,
	setSearchValue: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { typeRequest, setSearchValue })(
	OnChangeSearchBar
);
