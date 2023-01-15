/* eslint-disable */
import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './search.scss';
import logo from '../../assets/images/whoo-logo-with-text.svg';
import OnChangeSearchBar from '../../components/on-change-search-bar/OnChangeSearchBar';
import { getMyProfile } from '../../redux/actions/profile';
import { clearSearch } from '../../redux/actions/search';
import DisplayOnChangeSearchBarResults from '../../components/display-on-change-search-bar-results/DisplayOnChangeSearchBarResults';

function Search({ clearSearch, getMyProfile }) {
	useEffect(() => {
		clearSearch();
		getMyProfile();
	}, []);

	return (
		<div className="search-page">
			<div className="search-page-elements-container">
				<img className="search-page-logo" type="image" src={logo} alt="logo" />
				<div className="search-bar-wrapper">
					<OnChangeSearchBar />
					<DisplayOnChangeSearchBarResults />
				</div>
				<h1 className="search-page-heading">Search for users by name</h1>
				<p className="search-page-sub-heading">
					Search for users by name to see their profile or to add them as a
					friend.
				</p>
			</div>
		</div>
	);
}

Search.propTypes = {
	clearSearch: PropTypes.func.isRequired,
	getMyProfile: PropTypes.func.isRequired,
};

export default connect(null, { clearSearch, getMyProfile })(Search);
