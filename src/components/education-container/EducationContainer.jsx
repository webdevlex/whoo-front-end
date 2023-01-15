import React from 'react';

import './education-container.scss';
import PropTypes from 'prop-types';
import { FaUserGraduate } from 'react-icons/fa';

import ProfileTabs from '../profile-tabs/ProfileTabs';

function EducationContainer({ profileInfo, education, width }) {
	const educationTabSelected = profileInfo === 'Education';
	const hasEducation = education.length > 0;

	return (
		hasEducation && (
			<div className="side-list-container">
				{width < 769 && (
					<ProfileTabs
						name="Education"
						icon={<FaUserGraduate className="icon" />}
					/>
				)}
				<div
					className={`mobile-revealer-wrapper ${
						educationTabSelected ? 'reveal-info ' : null
					}`}
				>
					<div className="sub-section">
						<p className="text-line-text">EDUCATION</p>
						<ul className="side-list">
							{education.map(
								({ institution, area, startDate, endDate, studyType, _id }) => {
									return (
										institution && (
											<li className="side-list-item" key={_id}>
												<div className="top-line-wrapper">
													<p className="side-info-primary-text">
														{institution}
													</p>
													{studyType && (
														<p className="rank-text">{studyType}</p>
													)}
												</div>
												{area && (
													<p className="side-info-secondary-text">{area}</p>
												)}
												{startDate && endDate && (
													<p className="date-text">{`${startDate} - ${endDate}`}</p>
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

EducationContainer.propTypes = {
	education: PropTypes.array.isRequired,
	profileInfo: PropTypes.object.isRequired,
	width: PropTypes.number.isRequired,
};

export default EducationContainer;
