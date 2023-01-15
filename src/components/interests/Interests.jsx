import React from 'react';

import PropTypes from 'prop-types';
import { FaBiking } from 'react-icons/fa';

import './interests.scss';
import InfoLine from '../info-line/InfoLine';
import ProfileTabs from '../profile-tabs/ProfileTabs';

function Interests({ profileBeingViewed, profileInfo, width }) {
	const interests = profileBeingViewed.interests || [];
	const interestsTabSelected = profileInfo === 'Interests';
	const hasInterests = interests.length > 0;

	return (interestsTabSelected || width < 769) && hasInterests ? (
		<div className="section">
			{width < 769 && (
				<ProfileTabs name="Interests" icon={<FaBiking className="icon" />} />
			)}
			<div
				className={`mobile-revealer-wrapper ${
					interestsTabSelected ? 'reveal-info ' : null
				}`}
			>
				<div className="sub-section-wrapper ">
					<p className="section-title">INTERESTS</p>
					{interests[0].interest &&
						interests.map(({ interest, keywords, _id }) => {
							return (
								interest && (
									<div className="sub-section" key={_id}>
										<InfoLine
											title={interest}
											info={keywords.join(', ')}
											key={interest}
										/>
									</div>
								)
							);
						})}
				</div>
			</div>
		</div>
	) : null;
}

Interests.propTypes = {
	profileBeingViewed: PropTypes.object.isRequired,
	profileInfo: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
};

export default Interests;
