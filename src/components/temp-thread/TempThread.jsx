import React from 'react';

import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux';

import './temp-thread.scss';
import { clearNewThread, setSelectedThread } from '../../redux/actions/thread';
import UserImage from '../user-image/UserImage';

function TempThread({
	thread,
	contacts: currentUserContacts,
	clearNewThread,
	setSelectedThread,
}) {
	const { threadsLoading, selectedThread } = thread;
	const newThreadProfiles = thread.newThreadProfiles || [];
	const { length: numberOfPeopleInNewThread } = newThreadProfiles;
	const newThreadNamesDisplay = currentUserContacts
		.filter(({ user }) => newThreadProfiles.includes(user))
		.map(({ fullName }) => fullName)
		.join(', ')
		.slice(0, 30);
	const { length: newThreadNamesDisplayLength } = newThreadNamesDisplay;

	const handleCancelClick = () => {
		setSelectedThread(null);
		clearNewThread();
	};

	return (
		!threadsLoading &&
		selectedThread === 0 && (
			<div className="temp-thread selected">
				<div className="left">
					<div className="recipient-imgs">
						{currentUserContacts
							.filter(({ user }) => newThreadProfiles.includes(user))
							.map(({ pictureUrl, user }, index) => (
								<div
									key={user}
									className="recipient-img"
									style={{ left: index * 15, zIndex: index * -1 }}
								>
									<UserImage src={pictureUrl} />
								</div>
							))}
					</div>

					<p
						className="recipient-name"
						style={{
							marginLeft: `${50 + numberOfPeopleInNewThread * 15}px`,
						}}
					>
						{`${newThreadNamesDisplay}${
							newThreadNamesDisplayLength === 30 ? '...' : ''
						}`}
					</p>
				</div>
				<div className="right">
					<button
						className="cancel-new-message-button"
						type="button"
						onClick={() => handleCancelClick()}
					>
						<FaTrashAlt className="cancel-new-message-button-icon" />
					</button>
				</div>
			</div>
		)
	);
}

const mapStateToProps = (state) => ({
	thread: state.thread,
	contacts: state.profile.myProfile.contacts,
});

TempThread.propTypes = {
	thread: PropTypes.object.isRequired,
	contacts: PropTypes.array.isRequired,
	clearNewThread: PropTypes.func.isRequired,
	setSelectedThread: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { clearNewThread, setSelectedThread })(
	TempThread
);
