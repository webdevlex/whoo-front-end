/* eslint-disable */
import React, { useContext } from 'react';

import './profile-tabs.scss';
import PropTypes from 'prop-types';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { ProfileInfoContext } from '../../contexts/profileInfoContext';
import useWindowSize from '../../hooks/useWindowSize';

function ProfileTabs({ name, icon }) {
	const [profileInfo, setProfileInfo] = useContext(ProfileInfoContext);
	const [width] = useWindowSize();
	const tabSelected = profileInfo === name;

	const handleTabClick = () => {
		if (tabSelected && width < 769) {
			setProfileInfo('');
		} else {
			setProfileInfo(name);
		}
	};

	return (
		<button
			type="button"
			onClick={handleTabClick}
			className={tabSelected ? 'selected-tab profile-tab' : 'profile-tab'}
		>
			{icon}
			<div className="btn-text">{name}</div>
			{tabSelected ? (
				<FaChevronUp className="up-arrow arrow-icon" />
			) : (
				<FaChevronDown className="arrow-icon" />
			)}
		</button>
	);
}

ProfileTabs.propTypes = {
	name: PropTypes.string.isRequired,
	icon: PropTypes.object.isRequired,
};

export default ProfileTabs;
