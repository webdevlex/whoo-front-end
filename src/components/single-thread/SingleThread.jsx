import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setSelectedThread, clearNewThread } from '../../redux/actions/thread';
import UserImage from '../user-image/UserImage';

function SingleThread({
	_id,
	memberProfiles,
	selectedThread,
	setSelectedThread,
	setThreadsMenuOpen,
	clearNewThread,
	myProfile,
	numberOfMembersInThread,
	threadNamesDisplay,
	threadNamesDisplayLength,
	todaysFormattedDate,
	threadsFormattedDate,
	threadsFormattedTime,
}) {
	const threadClicked = (event) => {
		clearNewThread();
		setThreadsMenuOpen(false);
		setSelectedThread(event.target.getAttribute('_id'));
	};

	return (
		<button
			type="button"
			className={`thread ${_id === selectedThread ? 'selected' : ''}`}
			key={_id}
			_id={_id}
			onClick={(e) => threadClicked(e)}
		>
			<div className="left">
				<div className="recipient-imgs">
					{memberProfiles
						.filter(({ user }) => user !== myProfile.user)
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
						marginLeft: `${50 + (numberOfMembersInThread - 1) * 15}px`,
					}}
				>
					{`${threadNamesDisplay}${
						threadNamesDisplayLength === 30 ? '...' : ''
					}`}
				</p>
			</div>
			<div className="right">
				<div className="thread-timestamp-wrapper">
					{todaysFormattedDate === threadsFormattedDate ? (
						<p className="thread-timestamp">Today</p>
					) : (
						<p className="thread-timestamp">{threadsFormattedDate}</p>
					)}
					<p className="thread-timestamp">{threadsFormattedTime}</p>
				</div>
			</div>
		</button>
	);
}

SingleThread.defaultProps = {
	selectedThread: '-1',
};

SingleThread.propTypes = {
	_id: PropTypes.string.isRequired,
	selectedThread: PropTypes.string,
	setSelectedThread: PropTypes.func.isRequired,
	setThreadsMenuOpen: PropTypes.func.isRequired,
	clearNewThread: PropTypes.func.isRequired,
	memberProfiles: PropTypes.array.isRequired,
	myProfile: PropTypes.object.isRequired,
	numberOfMembersInThread: PropTypes.number.isRequired,
	threadNamesDisplay: PropTypes.string.isRequired,
	threadNamesDisplayLength: PropTypes.number.isRequired,
	todaysFormattedDate: PropTypes.string.isRequired,
	threadsFormattedDate: PropTypes.string.isRequired,
	threadsFormattedTime: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	thread: state.thread,
	myProfile: state.profile.myProfile,
});

export default connect(mapStateToProps, { setSelectedThread, clearNewThread })(
	SingleThread
);
