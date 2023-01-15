import React, { useEffect, useState } from 'react';

import './contacts.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import noContactsSvg from '../../assets/images/no-contacts-icon.svg';
import ContactsSearchBar from '../../components/contacts-search-bar/ContactsSearchBar';
import Loading from '../../components/loading/Loading';
import ProfileDisplay from '../../components/profile-display/ProfileDisplay';
import { getMyProfile } from '../../redux/actions/profile';

function Contacts({ profile, getMyProfile }) {
	const [searchValue, setSearchValue] = useState('');
	const { profileLoading } = profile;
	const myProfile = profile.myProfile || {};
	const currentUserContacts = myProfile.contacts || [];
	const regexp = new RegExp(`^${searchValue}`);
	const hasContacts = currentUserContacts.length;

	useEffect(() => {
		getMyProfile();
	}, []);

	return (
		<div className="contacts-page">
			{profileLoading ? (
				<Loading />
			) : (
				<>
					<div className="contacts-page-title">
						<h1 className="title-text">Contacts</h1>
						<ContactsSearchBar setSearchValue={setSearchValue} />
					</div>

					{hasContacts ? (
						<div className="contacts-list">
							{currentUserContacts.map((contact) => {
								return (
									regexp.test(contact.fullName) && (
										<ProfileDisplay
											key={contact._id}
											userProfile={contact}
											displayFriendButtons
										/>
									)
								);
							})}
						</div>
					) : (
						<div className="no-contacts-container">
							<img
								src={noContactsSvg}
								className="no-contacts-icon"
								alt="no contacts"
							/>
							<span className="no-contacts-text">You have no contacts...</span>
						</div>
					)}
				</>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	profile: state.profile,
	allProfilesLoading: state.allProfiles.allProfilesLoading,
});

Contacts.propTypes = {
	profile: PropTypes.object.isRequired,
	getMyProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getMyProfile })(Contacts);
