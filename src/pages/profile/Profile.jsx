/* eslint-disable */
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './profile.scss';
import { useParams } from 'react-router-dom';

import Loading from '../../components/loading/Loading';
import UserImage from '../../components/user-image/UserImage';
import { ProfileInfoProvider } from '../../contexts/profileInfoContext';
import InfoSections from '../../components/info-sections/InfoSections';
import MainInfo from '../../components/main-info/MainInfo';
import SideInfo from '../../components/side-info/SideInfo';
import { getProfile, getMyProfile } from '../../redux/actions/profile';
import useWindowSize from '../../hooks/useWindowSize';

function Profile({
	isLoading,
	profileLoading,
	getProfile,
	getMyProfile,
	profileBeingViewed,
	profileBeingViewedLoading,
}) {
	const pictureUrl = profileBeingViewed.pictureUrl || '';
	const { username } = useParams();
	const [width] = useWindowSize();

	useEffect(() => {
		getProfile(username);
		getMyProfile();
	}, [username]);

	return (
		<div className='profile-page'>
			{isLoading || profileBeingViewedLoading || profileLoading ? (
				<Loading />
			) : (
				<div className='profile-page-inner-container'>
					{width < 769 && (
						<div className='profile-picture-container'>
							<UserImage src={pictureUrl} />
						</div>
					)}

					<ProfileInfoProvider>
						<MainInfo />
						<InfoSections className='info-sections' />
						<SideInfo />
					</ProfileInfoProvider>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	isLoading: state.auth.isLoading,
	profileLoading: state.profile.profileLoading,
	profileBeingViewed: state.profileToView.profileBeingViewed,
	profileBeingViewedLoading: state.profileToView.profileBeingViewedLoading,
});

Profile.propTypes = {
	profileBeingViewed: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired,
	profileLoading: PropTypes.bool.isRequired,
	getProfile: PropTypes.func.isRequired,
	getMyProfile: PropTypes.func.isRequired,
	profileBeingViewedLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {
	getProfile,
	getMyProfile,
})(Profile);
