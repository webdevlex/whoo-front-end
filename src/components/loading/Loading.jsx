import React from 'react';

import './loading.scss';

function Loading() {
	return (
		<div className="loading-icon-container">
			<div className="lds-facebook">
				<div />
				<div />
				<div />
			</div>
			<span className="loading-text">Loading...</span>
		</div>
	);
}

export default Loading;
