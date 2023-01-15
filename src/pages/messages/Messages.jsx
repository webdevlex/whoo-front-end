import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './messages.scss';
import Conversation from '../../components/conversation/Conversation';
import Loading from '../../components/loading/Loading';
import Threads from '../../components/threads/Threads';
import { setOnEditProfilePage } from '../../redux/actions/navigation';
import { getMyProfile } from '../../redux/actions/profile';
import {
	getMyMessages,
	setSelectedThread,
	clearNewThread,
} from '../../redux/actions/thread';

function Messages({
	profileLoading,
	getMyProfile,
	getMyMessages,
	setSelectedThread,
	clearNewThread,
	setOnEditProfilePage,
}) {
	useEffect(() => {
		setOnEditProfilePage(true);
		getMyProfile();
		getMyMessages();
		return () => {
			setSelectedThread(null);
			setOnEditProfilePage(false);
			clearNewThread();
		};
	}, []);

	return (
		<div className="messages-page">
			{profileLoading ? (
				<Loading />
			) : (
				<>
					<Threads />
					<Conversation />
				</>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	threadsLoading: state.thread.threadsLoading,
	profileLoading: state.profile.profileLoading,
});

Messages.propTypes = {
	profileLoading: PropTypes.bool.isRequired,
	getMyProfile: PropTypes.func.isRequired,
	getMyMessages: PropTypes.func.isRequired,
	setSelectedThread: PropTypes.func.isRequired,
	clearNewThread: PropTypes.func.isRequired,
	setOnEditProfilePage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
	getMyProfile,
	getMyMessages,
	setSelectedThread,
	clearNewThread,
	setOnEditProfilePage,
})(Messages);
