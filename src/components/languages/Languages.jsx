import React from 'react';

import './languages.scss';
import PropTypes from 'prop-types';
import { FaAssistiveListeningSystems } from 'react-icons/fa';

import InfoLine from '../info-line/InfoLine';
import ProfileTabs from '../profile-tabs/ProfileTabs';

function Languages({ profileBeingViewed, profileInfo, width }) {
	const languages = profileBeingViewed.languages || [];
	const languagesTabSelected = profileInfo === 'Languages';
	const hasLangauges = languages.length > 0;

	return (languagesTabSelected || width < 769) && hasLangauges ? (
		<div className="section">
			{width < 769 && (
				<ProfileTabs
					name="Languages"
					icon={<FaAssistiveListeningSystems className="icon" />}
				/>
			)}

			<div
				className={`mobile-revealer-wrapper ${
					languagesTabSelected ? 'reveal-info ' : null
				}`}
			>
				<div className=" sub-section-wrapper">
					<span className="section-title">LANGUAGES</span>
					{profileBeingViewed.languages.map(({ language, fluency, _id }) => {
						return (
							language && (
								<div className="sub-section" key={_id}>
									<InfoLine title={language} info={fluency} />
								</div>
							)
						);
					})}
				</div>
			</div>
		</div>
	) : null;
}

Languages.propTypes = {
	profileBeingViewed: PropTypes.object.isRequired,
	profileInfo: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
};

export default Languages;
