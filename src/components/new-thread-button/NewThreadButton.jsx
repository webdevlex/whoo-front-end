import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';

import './new-thread-button.scss';
import {
	addProfileToNewThread,
	setSelectedThread,
	openDropdown,
} from '../../redux/actions/thread';
import UserImage from '../user-image/UserImage';

function NewThreadButton({
	myProfile,
	thread,
	addProfileToNewThread,
	setSelectedThread,
	openDropdown,
}) {
	const currentUserContacts = myProfile.contacts;
	const { dropdown, selectedThread } = thread;
	const [searchValue, setSearchValue] = useState('');

	const addProfile = (event) => {
		addProfileToNewThread(event.target.getAttribute('_id'));
		openDropdown(null);
		setSelectedThread(0);
	};

	const onClick = () => {
		openDropdown(dropdown === 'new-thread' ? null : 'new-thread');
	};

	const handleChange = (event) => {
		setSearchValue(event.target.value);
	};

	return selectedThread === 0 ? null : (
		<>
			<button
				type="button"
				className="new-message-button"
				onClick={() => onClick()}
			>
				New Message
			</button>

			{dropdown === 'new-thread' && (
				<div className="new-thread-dropdown">
					<div className="search-bar">
						<FaSearch className="icon" />
						<input
							onChange={(e) => handleChange(e)}
							name="search"
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
							return contactFullName.includes(searchValue) ? (
								<button
									type="button"
									className="dropdown-profile"
									_id={contactId}
									key={contactId}
									onClick={(e) => addProfile(e)}
								>
									<div className="img-container">
										<UserImage src={contactPictureUrl} />
									</div>
									<span className="profile-name">{contactFullName}</span>
								</button>
							) : null;
						}
					)}
				</div>
			)}
		</>
	);
}
const mapStateToProps = (state) => ({
	myProfile: state.profile.myProfile,
	thread: state.thread,
});

NewThreadButton.propTypes = {
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
})(NewThreadButton);
