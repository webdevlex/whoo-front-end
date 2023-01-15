import React from 'react';

import PropTypes from 'prop-types';
import { FaAward } from 'react-icons/fa';

import './awards.scss';
import ClickableInfoLine from '../clickable-info-line/ClickableInfoLine';
import InfoLine from '../info-line/InfoLine';
import ProfileTabs from '../profile-tabs/ProfileTabs';

function Awards({ profileToView, profileInfo, width }) {
	const { profileBeingViewed } = profileToView;
	const awards = profileBeingViewed.awards || [];
	const awardsTabSelected = profileInfo === 'Awards';
	const hasAwards = awards.length > 0;

	return (awardsTabSelected || width < 769) && hasAwards ? (
		<div className='section'>
			{width < 769 && (
				<ProfileTabs name='Awards' icon={<FaAward className='icon' />} />
			)}

			<div
				className={`mobile-revealer-wrapper ${
					awardsTabSelected ? 'reveal-info ' : null
				}`}>
				<div className='sub-section-wrapper'>
					<p className='section-title'>AWARDS</p>
					{awards.map(({ award, awarder, date, website, summary, _id }) => {
						return (
							award &&
							awarder && (
								<div className='sub-section' key={_id}>
									<InfoLine title='Award' info={award} />
									<InfoLine title='Awarder' info={awarder} />
									{date && <InfoLine title='Date' info={date} />}
									{website && (
										<ClickableInfoLine title='Website' info={website} />
									)}
									{summary && <InfoLine title='Summary' info={summary} />}
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

Awards.propTypes = {
	profileToView: PropTypes.object.isRequired,
	profileInfo: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
};

export default Awards;
