import React from 'react';

import './volunteer.scss';
import PropTypes from 'prop-types';
import { FaAward } from 'react-icons/fa';

import ClickableInfoLine from '../clickable-info-line/ClickableInfoLine';
import InfoLine from '../info-line/InfoLine';
import ProfileTabs from '../profile-tabs/ProfileTabs';

function Volunteer({ profileToView, profileInfo, width }) {
	const { profileBeingViewed } = profileToView;
	const volunteer = profileBeingViewed.volunteer || [];
	const volunteerTabSelected = profileInfo === 'Volunteer';
	const hasVolunteer = volunteer.length > 0;

	return (volunteerTabSelected || width < 769) && hasVolunteer ? (
		<div className='section'>
			{width < 769 && (
				<ProfileTabs name='Volunteer' icon={<FaAward className='icon' />} />
			)}

			<div
				className={`mobile-revealer-wrapper ${
					volunteerTabSelected ? 'reveal-info ' : null
				}`}>
				<div className='sub-section-wrapper'>
					<span className='section-title'>VOLUNTEER</span>
					{volunteer.map(
						({
							organization,
							position,
							startDate,
							endDate,
							website,
							summary,
							_id,
						}) => {
							return (
								organization && (
									<div className='sub-section' key={_id}>
										<InfoLine title='Organization' info={organization} />
										{position && <InfoLine title='Position' info={position} />}
										{startDate && (
											<InfoLine
												title='Date'
												info={`${startDate} ${endDate ? `- ${endDate}` : ''}`}
											/>
										)}
										{website && (
											<ClickableInfoLine title='Website' info={website} />
										)}
										{summary && <InfoLine title='Summary' info={summary} />}
										<div className='spacer' />
									</div>
								)
							);
						}
					)}
				</div>
			</div>
		</div>
	) : null;
}

Volunteer.propTypes = {
	profileToView: PropTypes.object.isRequired,
	profileInfo: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
};

export default Volunteer;
