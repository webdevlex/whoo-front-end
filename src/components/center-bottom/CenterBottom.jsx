import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { FaCommentAlt /* FaBan */ } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import {
	addProfileToNewThread,
	setSelectedThread,
} from '../../redux/actions/thread';
import AddContactButton from '../add-contact-button/AddContactButton';
import RemoveContactButton from '../remove-contact-button/RemoveContactButton';

import './center-bottom.scss';

function CenterBottom({
	auth,
	profile,
	profileBeingViewed,
	addProfileToNewThread,
	setSelectedThread,
}) {
	const [redirectToMessages, setRedirectToMessages] = useState(false);
	const { isAuthenticated } = auth;

	const hasProfile = profile.hasProfile || false;
	const myUsername = hasProfile ? profile.myProfile.basics.username : '';
	const myProfile = profile.myProfile || {};
	const contacts = myProfile.contacts || [];

	const {
		basics: { username: profileBeingViewedUsername },
		user: profileBeingViewedId,
	} = profileBeingViewed;

	const currentUserHasProfile =
		isAuthenticated && hasProfile && profileBeingViewedUsername !== myUsername;

	const handleMessageClick = () => {
		addProfileToNewThread(profileBeingViewedId);
		setSelectedThread(0);
		setRedirectToMessages(true);
	};

	if (redirectToMessages) {
		return <Navigate to='/messages' />;
	}

	return (
		<div className='center-bottom'>
			{currentUserHasProfile && (
				<>
					{contacts.some(
						({ username }) => username === profileBeingViewedUsername
					) ? (
						<>
							<button
								className='profile-button'
								type='button'
								onClick={handleMessageClick}>
								<p className='profile-button-text'>Message</p>
								<FaCommentAlt className='profile-button-icon' />
							</button>
							<RemoveContactButton
								text='Remove Friend'
								username={profileBeingViewedUsername}
							/>
						</>
					) : (
						<AddContactButton
							text='Add Friend'
							username={profileBeingViewedUsername}
						/>
					)}

					{/* <button className="profile-button" type="button">
						<p className="profile-button-text">Report User</p>
						<FaBan className="profile-button-icon" />
					</button> */}
				</>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
	profileBeingViewed: state.profileToView.profileBeingViewed,
});

CenterBottom.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	profileBeingViewed: PropTypes.object.isRequired,
	addProfileToNewThread: PropTypes.func.isRequired,
	setSelectedThread: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
	addProfileToNewThread,
	setSelectedThread,
})(CenterBottom);
