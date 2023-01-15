import React from 'react';

import loading from '../../assets/images/loading-buffering.gif';
import './component-loading.scss';

function ComponentLoading() {
	return (
		<div className="loader-wrapper">
			<img src={loading} alt="" />
		</div>
	);
}

export default ComponentLoading;
