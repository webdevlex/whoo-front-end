import React from 'react';

import './thread-title.scss';
import NewThreadButton from '../new-thread-button/NewThreadButton';

function ThreadTitle() {
	return (
		<div className="thread-title">
			<div className="left-title">
				<span className="title">All Messages</span>
			</div>
			<div className="right-title">
				<NewThreadButton />
			</div>
		</div>
	);
}

export default ThreadTitle;
