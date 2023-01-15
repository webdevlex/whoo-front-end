import React from 'react';

import './profile-display.scss';
import PropTypes from 'prop-types';
import { FaCheckCircle } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProfile } from '../../redux/actions/profile';
import AddContactButton from '../add-contact-button/AddContactButton';
import RemoveContactButton from '../remove-contact-button/RemoveContactButton';
import UserImage from '../user-image/UserImage';

function ProfileDisplay({ userProfile, profile, displayFriendButtons }) {
	const {
		fullName: searchResultsFullName,
		pictureUrl: searchResultsPictureUrl,
		username: searchResultsUserName,
		jobTitle: searchResultsJobTitle,
	} = userProfile;
	const searchResultsProfileUrl = `/profile/${searchResultsUserName}`;

	const myProfile = profile.myProfile || {};
	const userContacts = myProfile.contacts || [];

	return (
		<li className='search-results-profile-display'>
			<div className='profile-display-inner-left-container'>
				<div className='profile-display-image-container'>
					<UserImage src={searchResultsPictureUrl} />
				</div>

				<div className='profile-display-text-container'>
					<div className='name-and-username-wrapper'>
						<Link className='button-to-profile' to={searchResultsProfileUrl}>
							{searchResultsFullName}
						</Link>
						<p className='profile-username'>{`@${searchResultsUserName}`}</p>
					</div>
					<p className='profile-job-title'>{searchResultsJobTitle}</p>
				</div>
			</div>

			{displayFriendButtons && (
				<div className='profile-display-inner-right-container'>
					{profile.addContactAlert === searchResultsUserName && (
						<p className='added-alert'>
							Added <FaCheckCircle className='icon' />
						</p>
					)}
					{userContacts.some(
						({ username }) => username === searchResultsUserName
					) ? (
						<RemoveContactButton username={searchResultsUserName} />
					) : (
						<AddContactButton username={searchResultsUserName} />
					)}
				</div>
			)}
		</li>
	);
}

const mapStateToProps = (state) => ({
	profile: state.profile,
});

ProfileDisplay.propTypes = {
	userProfile: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	displayFriendButtons: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getProfile })(ProfileDisplay);
