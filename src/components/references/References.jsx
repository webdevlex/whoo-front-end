import React from 'react';

import './references.scss';
import PropTypes from 'prop-types';
import { FaLink } from 'react-icons/fa';

import ClickableInfoLine from '../clickable-info-line/ClickableInfoLine';
import InfoLine from '../info-line/InfoLine';
import ProfileTabs from '../profile-tabs/ProfileTabs';

function References({ profileToView, profileInfo, width }) {
	const { profileBeingViewed } = profileToView;
	const references = profileBeingViewed.references || [];
	const referencesTabSelected = profileInfo === 'References';
	const hasReference = references.length > 0;

	return (referencesTabSelected || width < 769) && hasReference ? (
		<div className='section'>
			{width < 769 && (
				<ProfileTabs name='References' icon={<FaLink className='icon' />} />
			)}

			<div
				className={`mobile-revealer-wrapper ${
					referencesTabSelected ? 'reveal-info ' : null
				}`}>
				<div className='sub-section-wrapper'>
					<span className='section-title'>REFERENCES</span>
					{references.map(({ name, phone, email, website, _id }) => {
						return (
							name && (
								<div className='sub-section' key={_id}>
									<InfoLine title='Name' info={name} />
									{phone && <InfoLine title='Phone' info={phone} />}
									{email && (
										<InfoLine title='Email' info={email} color='color' />
									)}
									{website && (
										<ClickableInfoLine
											title='Website'
											info={website}
											color='color'
										/>
									)}
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

References.propTypes = {
	profileToView: PropTypes.object.isRequired,
	profileInfo: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
};

export default References;
