import React from 'react';

import './socials.scss';
import PropTypes from 'prop-types';
import { FaUsers } from 'react-icons/fa';

import ClickableInfoLine from '../clickable-info-line/ClickableInfoLine';
import InfoLine from '../info-line/InfoLine';
import ProfileTabs from '../profile-tabs/ProfileTabs';

function Socials({ profileToView, profileInfo, width }) {
	const { profileBeingViewed } = profileToView;

	const profiles = profileBeingViewed.profiles || [];
	const socialsTabSelected = profileInfo === 'Socials';
	const hasSocials = profiles.length > 0;

	return (socialsTabSelected || width < 769) && hasSocials ? (
		<div className='section'>
			{width < 769 && (
				<ProfileTabs name='Socials' icon={<FaUsers className='icon' />} />
			)}
			<div
				className={`mobile-revealer-wrapper ${
					socialsTabSelected ? 'reveal-info ' : null
				}`}>
				<div className='sub-section-wrapper'>
					<p className='section-title'>SOCIALS</p>
					{profiles.map(({ network, username, url, _id }) => {
						return (
							network && (
								<div className='sub-section' key={_id}>
									<InfoLine title='Network' info={network} />

									{username && (
										<InfoLine title='Username' info={`@${username}`} />
									)}

									{url && <ClickableInfoLine title='Url' info={url} />}

									<div className='spacer' />
								</div>
							)
						);
					})}
				</div>
			</div>
		</div>
	) : null;
}

Socials.propTypes = {
	profileToView: PropTypes.object.isRequired,
	profileInfo: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
};

export default Socials;
