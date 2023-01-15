import React from 'react';

import './display-on-change-search-bar-results.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileDisplay from '../profile-display/ProfileDisplay';

function DisplayOnChangeSearchBarResults({ searchResults }) {
	const hasSearchResults = searchResults.length;
	const MAX_NUMBER_OF_PROFILE_DISPLAYS = 5;

	return hasSearchResults ? (
		<div className="on-change-search-bar-results-container">
			{searchResults.slice(0, MAX_NUMBER_OF_PROFILE_DISPLAYS).map((profile) => (
				<ProfileDisplay
					userProfile={profile}
					displayFriendButtons={false}
					key={profile.user}
				/>
			))}
		</div>
	) : null;
}

const mapStateToProps = (state) => ({
	searchResults: state.search.searchResults,
});

DisplayOnChangeSearchBarResults.propTypes = {
	searchResults: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, {})(DisplayOnChangeSearchBarResults);
