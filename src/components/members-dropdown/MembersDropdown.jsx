import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { FaAngleDown } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProfile } from '../../redux/actions/profile';
import UserImage from '../user-image/UserImage';
import './members-dropdown.scss';

function MembersDropdown({ thread, myProfile }) {
	const [membersDropDownOpen, setMembersDropDown] = useState(false);

	const toggleDropDown = () => {
		setMembersDropDown((membersDropDownOpen) => !membersDropDownOpen);
	};

	const { threads, selectedThread, newThreadProfiles } = thread;
	const { contacts } = myProfile;
	const selectedThreadIndex = threads.findIndex(
		({ _id }) => _id === selectedThread
	);

	return (
		<div className="members-dropdown-container">
			<button
				type="button"
				className="members-dropdown-button"
				onClick={() => toggleDropDown()}
			>
				<FaAngleDown />
			</button>
			{membersDropDownOpen && (
				<div className="members-dropdown">
					{selectedThread !== null &&
						(selectedThread === 0
							? contacts.map(
									({ user, pictureUrl, username, fullName, _id }) => {
										return newThreadProfiles.includes(user) ? (
											<Link
												to={`/profile/${username}`}
												className="member"
												key={_id}
											>
												<div className="member-img-container">
													<UserImage src={pictureUrl} />
												</div>

												<div className="member-info">
													<p className="member-fullname">{fullName}</p>
													<p className="member-username">@{username}</p>
												</div>
											</Link>
										) : null;
									}
							  )
							: threads[selectedThreadIndex].memberProfiles.map(
									({ user, pictureUrl, username, fullName, _id }) => {
										return user !== myProfile.user ? (
											<Link
												to={`/profile/${username}`}
												className="member"
												key={_id}
											>
												<div className="member-img-container" key={user}>
													<UserImage src={pictureUrl} />
												</div>

												<div className="member-info">
													<p className="member-fullname">{fullName}</p>
													<p className="member-username">@{username}</p>
												</div>
											</Link>
										) : null;
									}
							  ))}
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	thread: state.thread,
	myProfile: state.profile.myProfile,
});

MembersDropdown.propTypes = {
	thread: PropTypes.object.isRequired,
	myProfile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getProfile })(MembersDropdown);
