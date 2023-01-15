import React from 'react';

import PropTypes from 'prop-types';
import {
	FaMailBulk,
	FaLink,
	FaAward,
	FaRegNewspaper,
	FaRegHandshake,
	FaUsers,
	FaBiking,
	FaAssistiveListeningSystems,
	FaClipboardCheck,
} from 'react-icons/fa';

import './bottom-line.scss';
import ProfileTabs from '../profile-tabs/ProfileTabs';

function BottomLine({ profileBeingViewed }) {
	const {
		profiles,
		interests,
		awards,
		publications,
		volunteer,
		references,
		languages,
		projects,
	} = profileBeingViewed;

	const hasProfiles = profiles.length > 0 && profiles[0].network;
	const hasProjects = projects.length > 0 && projects[0].projectName;
	const hasInterests = interests.length > 0 && interests[0].interest;
	const hasAwards = awards.length > 0 && awards[0].award && awards[0].awarder;
	const hasPublications = publications.length > 0 && publications[0].title;
	const hasVolunteer = volunteer.length > 0 && volunteer[0].organization;
	const hasRefereneces = references.length > 0 && references[0].name;
	const hasLanguages = languages.length > 0 && languages[0].language;

	return (
		<div className="bottom-line">
			<ProfileTabs name="Contact" icon={<FaMailBulk className="icon" />} />

			{hasProjects && (
				<ProfileTabs
					name="Projects"
					icon={<FaClipboardCheck className="icon" />}
				/>
			)}

			{hasProfiles && (
				<ProfileTabs name="Socials" icon={<FaUsers className="icon" />} />
			)}

			{hasInterests && (
				<ProfileTabs name="Interests" icon={<FaBiking className="icon" />} />
			)}

			{hasAwards && (
				<ProfileTabs name="Awards" icon={<FaAward className="icon" />} />
			)}

			{hasPublications && (
				<ProfileTabs
					name="Publications"
					icon={<FaRegNewspaper className="icon" />}
				/>
			)}

			{hasVolunteer && (
				<ProfileTabs
					name="Volunteer"
					icon={<FaRegHandshake className="icon" />}
				/>
			)}

			{hasRefereneces && (
				<ProfileTabs name="References" icon={<FaLink className="icon" />} />
			)}

			{hasLanguages && (
				<ProfileTabs
					name="Languages"
					icon={<FaAssistiveListeningSystems className="icon" />}
				/>
			)}
		</div>
	);
}

BottomLine.propTypes = {
	profileBeingViewed: PropTypes.object.isRequired,
};

export default BottomLine;
