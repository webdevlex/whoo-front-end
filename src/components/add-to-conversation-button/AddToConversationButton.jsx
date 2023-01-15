import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';

import './add-to-conversation-button.scss';
import {
	addProfileToNewThread,
	setSelectedThread,
	openDropdown,
} from '../../redux/actions/thread';
import UserImage from '../user-image/UserImage';

function AddToConversationButton({
	myProfile,
	thread,
	addProfileToNewThread,
	setSelectedThread,
	openDropdown,
}) {
	const currentUserContacts = myProfile.contacts;
	const { dropdown, newThreadProfiles } = thread;

	const [searchValue, setSearchValue] = useState('');

	const toggleAddToConversationDropDown = () => {
		openDropdown(dropdown === 'add-recipient' ? null : 'add-recipient');
	};

	const handleAddUserToConversationClick = (event) => {
		addProfileToNewThread(event.target.getAttribute('_id'));
		openDropdown(null);
		setSelectedThread(0);
	};

	const handleSearchChange = (event) => {
		setSearchValue(event.target.value);
	};

	return (
		<>
			<button
				type="button"
				className="add-to-conversation-button"
				onClick={() => toggleAddToConversationDropDown()}
			>
				<FaPlus className="icon" />
			</button>
			{dropdown === 'add-recipient' ? (
				<div className="contacts-dropdown">
					<div className="search-bar">
						<FaSearch className="icon" />
						<input
							onChange={(e) => handleSearchChange(e)}
							type="text"
							className="input"
						/>
					</div>
					{currentUserContacts.map(
						({
							pictureUrl: contactPictureUrl,
							fullName: contactFullName,
							user: contactId,
						}) => {
							return contactFullName.includes(searchValue) &&
								!newThreadProfiles.includes(contactId) ? (
								<button
									type="button"
									className="dropdown-profile"
									_id={contactId}
									key={contactId}
									onClick={(e) => handleAddUserToConversationClick(e)}
								>
									<div className="img-container">
										<UserImage src={contactPictureUrl} />
									</div>
									<p className="profile-name">{contactFullName}</p>
								</button>
							) : null;
						}
					)}
				</div>
			) : null}
		</>
	);
}

const mapStateToProps = (state) => ({
	myProfile: state.profile.myProfile,
	thread: state.thread,
});

AddToConversationButton.propTypes = {
	myProfile: PropTypes.object.isRequired,
	thread: PropTypes.object.isRequired,
	addProfileToNewThread: PropTypes.func.isRequired,
	setSelectedThread: PropTypes.func.isRequired,
	openDropdown: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
	addProfileToNewThread,
	setSelectedThread,
	openDropdown,
})(AddToConversationButton);
