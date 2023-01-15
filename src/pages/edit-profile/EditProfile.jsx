/* eslint-disable */
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './edit-profile.scss';
import Loading from '../../components/loading/Loading';
import { setOnEditProfilePage } from '../../redux/actions/navigation';
import {
	clearAlerts,
	getMyProfile,
	saveProfile,
	saveProfilePicture,
} from '../../redux/actions/profile';
import CreateProfile from '../../components/create-profile/CreateProfile';
import EditAwards from '../../components/edit-awards/EditAwards';
import EditContact from '../../components/edit-contact/EditContact';
import EditEducation from '../../components/edit-education/EditEducation';
import EditInterests from '../../components/edit-interests/EditInterests';
import EditLanguages from '../../components/edit-languages/EditLanguages';
import EditMenu from '../../components/edit-menu/EditMenu';
import EditProfilePicture from '../../components/edit-profile-picture/EditProfilePicture';
import EditPublications from '../../components/edit-publications/EditPublications';
import EditReferences from '../../components/edit-references/EditReferences';
import EditSocials from '../../components/edit-socials/EditSocials';
import EditVolunteer from '../../components/edit-volunteer/EditVolunteer';
import EditWork from '../../components/edit-work/EditWork';
import EditProjects from '../../components/edit-projects/EditProjects';

function EditProfile({
	isLoading,
	profileLoading,
	hasProfile,
	clearAlerts,
	getMyProfile,
	profile,
	saveProfile,
	saveProfilePicture,
	setOnEditProfilePage,
	errors,
}) {
	useEffect(() => {
		getMyProfile();
		clearAlerts();
		setOnEditProfilePage(true);
		return () => {
			clearAlerts();
			setOnEditProfilePage(false);
		};
	}, []);

	const { myProfile, saveProfileLoading } = profile;
	const [selected, setSelected] = useState('edit-contact');

	const displayEditProfilePage = (
		<>
			<EditMenu selected={selected} setSelected={setSelected} />
			<div className="inputs-container">
				<EditProfilePicture
					myProfile={myProfile}
					saveProfilePicture={saveProfilePicture}
					selected={selected}
					saveProfileLoading={saveProfileLoading}
				/>
				<EditProjects
					myProfile={myProfile}
					saveProfile={saveProfile}
					selected={selected}
				/>
				<EditContact
					myProfile={myProfile}
					saveProfile={saveProfile}
					selected={selected}
					errors={errors}
				/>
				<EditSocials
					myProfile={myProfile}
					saveProfile={saveProfile}
					selected={selected}
				/>
				<EditInterests
					myProfile={myProfile}
					saveProfile={saveProfile}
					selected={selected}
				/>
				<EditAwards
					myProfile={myProfile}
					saveProfile={saveProfile}
					selected={selected}
				/>
				<EditPublications
					myProfile={myProfile}
					saveProfile={saveProfile}
					selected={selected}
				/>

				<EditVolunteer
					myProfile={myProfile}
					saveProfile={saveProfile}
					selected={selected}
				/>
				<EditReferences
					myProfile={myProfile}
					saveProfile={saveProfile}
					selected={selected}
				/>

				<EditLanguages
					myProfile={myProfile}
					saveProfile={saveProfile}
					selected={selected}
				/>
				<EditWork
					myProfile={myProfile}
					saveProfile={saveProfile}
					selected={selected}
				/>

				<EditEducation
					myProfile={myProfile}
					saveProfile={saveProfile}
					selected={selected}
				/>
			</div>
		</>
	);

	const dashboard = hasProfile ? displayEditProfilePage : <CreateProfile />;

	return (
		<div className="edit-profile-page">
			{isLoading || profileLoading ? <Loading /> : dashboard}
		</div>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	isLoading: state.auth.isLoading,
	myUsername: state.profile.myUsername,
	hasProfile: state.profile.hasProfile,
	profileLoading: state.profile.profileLoading,
	profile: state.profile,
	errors: state.errors,
});

EditProfile.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	profileLoading: PropTypes.bool.isRequired,
	hasProfile: PropTypes.bool.isRequired,
	clearAlerts: PropTypes.func.isRequired,
	getMyProfile: PropTypes.func.isRequired,
	saveProfile: PropTypes.func.isRequired,
	saveProfilePicture: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
	saveProfile,
	clearAlerts,
	getMyProfile,
	saveProfilePicture,
	setOnEditProfilePage,
})(EditProfile);
