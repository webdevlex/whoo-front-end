/* eslint-disable */
import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './real-threads.scss';
import SingleThread from '../../components/single-thread/SingleThread';
import {
	formatTime,
	formatDate,
} from '../../assets/helper-functions/helperFunctions';

function RealThreads({ thread, myProfile, setThreadsMenuOpen }) {
	const todaysDate = new Date();
	const todaysFormattedDate = formatDate(todaysDate);
	const { threadsLoading, threads, selectedThread } = thread;

	return (
		!threadsLoading &&
		threads
			.sort((firstThread, secondThread) => {
				const firstThreadLastUpdated = firstThread.lastUpdated;
				const secondThreadLastUpdated = secondThread.lastUpdated;
				if (firstThreadLastUpdated < secondThreadLastUpdated) {
					return 1;
				}
				return -1;
			})
			.map(({ _id, memberProfiles, lastUpdated }) => {
				const dateThreadLastUpdated = new Date(lastUpdated);
				const threadsFormattedTime = formatTime(dateThreadLastUpdated);
				const threadsFormattedDate = formatDate(dateThreadLastUpdated);

				const { length: numberOfMembersInThread } = memberProfiles;
				const threadNamesDisplay = memberProfiles
					.filter(({ user }) => user !== myProfile.user)
					.map(({ fullName }) => fullName)
					.join(', ')
					.slice(0, 30);
				const { length: threadNamesDisplayLength } = threadNamesDisplay;

				return (
					<SingleThread
						key={_id}
						_id={_id}
						memberProfiles={memberProfiles}
						selectedThread={selectedThread}
						setThreadsMenuOpen={setThreadsMenuOpen}
						numberOfMembersInThread={numberOfMembersInThread}
						threadNamesDisplay={threadNamesDisplay}
						threadNamesDisplayLength={threadNamesDisplayLength}
						todaysFormattedDate={todaysFormattedDate}
						threadsFormattedTime={threadsFormattedTime}
						threadsFormattedDate={threadsFormattedDate}
					/>
				);
			})
	);
}

const mapStateToProps = (state) => ({
	thread: state.thread,
	myProfile: state.profile.myProfile,
});

RealThreads.propTypes = {
	thread: PropTypes.object.isRequired,
	myProfile: PropTypes.object.isRequired,
	setThreadsMenuOpen: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {})(RealThreads);
