import React from 'react';

import './publications.scss';
import PropTypes from 'prop-types';
import { FaRegNewspaper } from 'react-icons/fa';

import ClickableInfoLine from '../clickable-info-line/ClickableInfoLine';
import InfoLine from '../info-line/InfoLine';
import ProfileTabs from '../profile-tabs/ProfileTabs';

function Publications({ profileToView, profileInfo, width }) {
	const { profileBeingViewed } = profileToView;
	const publicationsTabSelected = profileInfo === 'Publications';
	const hasPublications = profileBeingViewed.publications.length > 0;

	return (publicationsTabSelected || width < 769) && hasPublications ? (
		<div className='section'>
			{width < 769 && (
				<ProfileTabs
					name='Publications'
					icon={<FaRegNewspaper className='icon' />}
				/>
			)}

			<div
				className={`mobile-revealer-wrapper ${
					publicationsTabSelected ? 'reveal-info ' : null
				}`}>
				<div className='sub-section-wrapper'>
					<p className='section-title'>PUBLICATIONS</p>
					{profileBeingViewed.publications.map(
						({ title, publisher, releaseDate, website, summary, _id }) => {
							return (
								title && (
									<div className='sub-section' key={_id}>
										<InfoLine title='Title' info={title} />
										{publisher && (
											<InfoLine title='Publisher' info={publisher} />
										)}
										{releaseDate && (
											<InfoLine title='Release Date' info={releaseDate} />
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

Publications.propTypes = {
	profileToView: PropTypes.object.isRequired,
	profileInfo: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
};

export default Publications;
