import React from 'react';

import './top-line.scss';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt } from 'react-icons/fa';

function TopLine({ profileBeingViewed }) {
	const { basics } = profileBeingViewed;
	const fullName = basics.fullName || '';
	const jobTitle = basics.jobTitle || '';
	const username = basics.username || '';

	const location = basics.location || {};
	const city = location.city || '';
	const region = location.region || '';
	const comma = city && region && ',';

	return (
		<div className="top-line">
			<div className="left">
				<div className="fullname-username-location">
					<div className="fullname-user-label-wrapper">
						<h1 className="fullname">{fullName}</h1>
						{jobTitle && <p className="user-label">{jobTitle}</p>}
					</div>
					<h1 className="username">{`@${username}`}</h1>
					{(city || region) && (
						<div className="pin">
							<FaMapMarkerAlt className="pin-icon" />
							<h3 className="location-text">{`${city}${comma} ${region}`}</h3>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

TopLine.propTypes = {
	profileBeingViewed: PropTypes.object.isRequired,
};

export default TopLine;
