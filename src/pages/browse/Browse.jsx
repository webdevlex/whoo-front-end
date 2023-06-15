import React, { useEffect } from 'react';

import './browse.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import noSearchResultsSvg from '../../assets/images/no-search-results.svg';
import ComponentLoading from '../../components/component-loading/ComponentLoading';
import Loading from '../../components/loading/Loading';
import OnChangeSearchBar from '../../components/on-change-search-bar/OnChangeSearchBar';
import ProfileDisplay from '../../components/profile-display/ProfileDisplay';
import {
	getMyProfile,
	getAllProfilesFormatted,
} from '../../redux/actions/profile';
import { clearSearch } from '../../redux/actions/search';

function Browse({
	profiles,
	search,
	getMyProfile,
	clearSearch,
	profileLoading,
	getAllProfilesFormatted,
	isAuthenticated,
}) {
	const { searchedUsersLoading, searchResults } = search;
	const hasSearchResults = searchResults.length;

	useEffect(() => {
		getMyProfile();
		getAllProfilesFormatted();
		return () => {
			clearSearch();
		};
	}, []);

	return (
		<div className='browse-page'>
			{profileLoading ? (
				<Loading />
			) : (
				<>
					<div className='browse-title-and-search-bar-container'>
						<div className='title-text'>Browse Users</div>
						<OnChangeSearchBar />
					</div>
					{searchedUsersLoading ? (
						<ComponentLoading />
					) : (
						// eslint-disable-next-line react/jsx-no-useless-fragment
						<>
							{hasSearchResults ? (
								<div className='browse-unordered-list'>
									{searchResults.map((profile) => (
										<ProfileDisplay
											key={profile.username}
											userProfile={profile}
											displayFriendButtons={isAuthenticated}
										/>
									))}
								</div>
							) : (
								<div className='browse-unordered-list'>
									{profiles.map((profile) => (
										<ProfileDisplay
											key={profile.username}
											userProfile={profile}
											displayFriendButtons={isAuthenticated}
										/>
									))}
								</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	allProfilesLoading: state.allProfiles.allProfilesLoading,
	profiles: state.allProfiles.profilesFormatted,
	isAuthenticated: state.auth.isAuthenticated,
	search: state.search,
	profileLoading: state.profile.profileLoading,
});

Browse.propTypes = {
	search: PropTypes.object.isRequired,
	getMyProfile: PropTypes.func.isRequired,
	clearSearch: PropTypes.func.isRequired,
	getAllProfilesFormatted: PropTypes.func.isRequired,
	profileLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {
	getMyProfile,
	clearSearch,
	getAllProfilesFormatted,
})(Browse);
