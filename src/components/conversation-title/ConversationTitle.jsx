import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './conversation-title.scss';
import AddToConversationButton from '../add-to-conversation-button/AddToConversationButton';
import MembersDropdown from '../members-dropdown/MembersDropdown';
import UserImage from '../user-image/UserImage';

function ConversationTitle({ thread, myProfile }) {
	const { threads, selectedThread, newThreadProfiles } = thread;
	const { contacts } = myProfile;
	const selectedThreadIndex = threads.findIndex(
		({ _id }) => _id === selectedThread
	);

	return (
		<div className="conversation-title">
			<MembersDropdown />
			<div className="title-left">
				<span className="recipient-text">To:</span>
				{selectedThread !== null &&
					(selectedThread === 0
						? contacts.map(({ user, pictureUrl }) => {
								return newThreadProfiles.includes(user) ? (
									<div className="img-container" key={user}>
										<UserImage src={pictureUrl} />
									</div>
								) : null;
						  })
						: threads[selectedThreadIndex].memberProfiles.map(
								({ user, pictureUrl }) => {
									return user !== myProfile.user ? (
										<div className="img-container" key={user}>
											<UserImage src={pictureUrl} />
										</div>
									) : null;
								}
						  ))}
			</div>

			<div className="title-right">
				{selectedThread === 0 ? <AddToConversationButton /> : null}
			</div>
		</div>
	);
}
const mapStateToProps = (state) => ({
	thread: state.thread,
	myProfile: state.profile.myProfile,
});

ConversationTitle.propTypes = {
	thread: PropTypes.object.isRequired,
	myProfile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(ConversationTitle);
