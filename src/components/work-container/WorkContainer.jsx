/* eslint-disable */

import React from 'react';

import './work-container.scss';
import PropTypes from 'prop-types';
import { FaWrench } from 'react-icons/fa';

import ProfileTabs from '../profile-tabs/ProfileTabs';

function WorkContainer({ profileInfo, work, width }) {
	const workTabSelected = profileInfo === 'Work';
	const hasWork = work.length > 0;

	return (
		hasWork && (
			<div className='side-list-container'>
				{width < 769 && (
					<ProfileTabs name='Work' icon={<FaWrench className='icon' />} />
				)}
				<div
					className={`mobile-revealer-wrapper ${
						workTabSelected ? 'reveal-info ' : null
					}`}>
					<div className='sub-section'>
						<p className='text-line-text'>WORK</p>
						<ul className='side-list'>
							{work.map(
								({
									company,
									position,
									startDate,
									endDate,
									website,
									priority,
									_id,
								}) => {
									return (
										company && (
											<li className='side-list-item' key={_id}>
												<div className='top-line-wrapper'>
													<p className='side-info-primary-text'>{company}</p>
													{priority && <p className='rank-text'>{priority}</p>}
												</div>
												{position && (
													<p className='side-info-secondary-text'>{position}</p>
												)}
												{website && (
													<a
														href={`http://${website}`}
														className='website-text'
														target='_blank'>
														{website}
													</a>
												)}

												{startDate && endDate && (
													<p className='date-text'>{`${startDate} - ${endDate}`}</p>
												)}
											</li>
										)
									);
								}
							)}
						</ul>
					</div>
				</div>
			</div>
		)
	);
}

WorkContainer.propTypes = {
	work: PropTypes.array.isRequired,
};

export default WorkContainer;
