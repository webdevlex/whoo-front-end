/* eslint-disable */
import React, { useContext, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './info-sections.scss';
import { ProfileInfoContext } from '../../contexts/profileInfoContext';
import useWindowSize from '../../hooks/useWindowSize';
import Awards from '../awards/Awards';
import Contact from '../contact/Contact';
import Interests from '../interests/Interests';
import Languages from '../languages/Languages';
import Publications from '../publications/Publications';
import References from '../references/References';
import Socials from '../socials/Socials';
import Volunteer from '../volunteer/Volunteer';
import ProjectsDisplay from '../projects-display/ProjectsDisplay';

function InfoSections({ profileToView }) {
	const [width] = useWindowSize();
	const [profileInfo, setProfileInfo] = useContext(ProfileInfoContext);

	const { profileBeingViewed } = profileToView;

	useEffect(() => {
		const onMobileOnlyTabs =
			profileInfo === '' ||
			profileInfo === 'Education' ||
			profileInfo === 'Work';
		const notOnMobile = width > 769;
		if (notOnMobile && onMobileOnlyTabs) {
			setProfileInfo('Contact');
		}
	}, [width]);

	return (
		<div className="info-sections">
			<Contact
				profileInfo={profileInfo}
				profileToView={profileToView}
				width={width}
			/>
			<ProjectsDisplay
				profileInfo={profileInfo}
				profileToView={profileToView}
				width={width}
			/>
			<Socials
				profileInfo={profileInfo}
				profileToView={profileToView}
				width={width}
			/>
			<Interests
				profileInfo={profileInfo}
				profileBeingViewed={profileBeingViewed}
				width={width}
			/>
			<Awards
				profileInfo={profileInfo}
				profileToView={profileToView}
				width={width}
			/>
			<Publications
				profileInfo={profileInfo}
				profileToView={profileToView}
				width={width}
			/>
			<Volunteer
				profileInfo={profileInfo}
				profileToView={profileToView}
				width={width}
			/>
			<References
				profileInfo={profileInfo}
				profileToView={profileToView}
				width={width}
			/>
			<Languages
				profileInfo={profileInfo}
				profileBeingViewed={profileBeingViewed}
				width={width}
			/>
		</div>
	);
}

const mapStateToProps = (state) => ({
	profileToView: state.profileToView,
});

InfoSections.propTypes = {
	profileToView: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(InfoSections);
