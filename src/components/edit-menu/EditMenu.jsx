import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import {
	FaCamera,
	FaUserGraduate,
	FaWrench,
	FaLink,
	FaAward,
	FaRegNewspaper,
	FaRegHandshake,
	FaUsers,
	FaRegTrashAlt,
	FaMailBulk,
	FaBiking,
	FaAssistiveListeningSystems,
	FaAngleRight,
	FaAngleLeft,
	FaClipboardCheck,
} from 'react-icons/fa';
import { connect } from 'react-redux';

import './edit-menu.scss';
import useWindowSize from '../../hooks/useWindowSize';
import { deleteProfile, clearAlerts } from '../../redux/actions/profile';
import EditProfileButton from '../edit-profile-button/EditProfileButton';

function EditMenu({ selected, setSelected, deleteProfile, clearAlerts }) {
	const [width] = useWindowSize();
	const [editMenuOpen, setEditMenuOpen] = useState(false);

	const toggleEditMenuOpen = () => {
		setEditMenuOpen((editMenuOpen) => !editMenuOpen);
	};

	const deleteClicked = () => {
		deleteProfile();
	};

	const onClick = (selected) => {
		clearAlerts();
		setSelected(selected);
		toggleEditMenuOpen();
	};

	useEffect(() => {
		if (width > 576 && editMenuOpen) {
			toggleEditMenuOpen();
		}
	}, [width]);

	return (
		<div
			className={`edit-profile-menu-wrapper ${
				editMenuOpen && width < 576 ? 'open' : null
			}`}
		>
			<div
				className={`edit-profile-menu ${
					editMenuOpen && width < 576 ? 'border-right' : null
				}`}
			>
				<EditProfileButton
					text="Profile Picture"
					selected={selected}
					name="edit-profile-picture"
					icon={<FaCamera className="icon" />}
					clickFunc={onClick}
				/>

				<EditProfileButton
					text="Contact"
					selected={selected}
					name="edit-contact"
					icon={<FaMailBulk className="icon" />}
					clickFunc={onClick}
				/>
				<EditProfileButton
					text="Projects"
					selected={selected}
					name="edit-projects"
					icon={<FaClipboardCheck className="icon" />}
					clickFunc={onClick}
				/>
				<EditProfileButton
					text="Socials"
					selected={selected}
					name="edit-socials"
					icon={<FaUsers className="icon" />}
					clickFunc={onClick}
				/>
				<EditProfileButton
					text="Interests"
					selected={selected}
					name="edit-interests"
					icon={<FaBiking className="icon" />}
					clickFunc={onClick}
				/>
				<EditProfileButton
					text="Awards"
					selected={selected}
					name="edit-awards"
					icon={<FaAward className="icon" />}
					clickFunc={onClick}
				/>

				<EditProfileButton
					text="Publications"
					selected={selected}
					name="edit-publications"
					icon={<FaRegNewspaper className="icon" />}
					clickFunc={onClick}
				/>

				<EditProfileButton
					text="Volunteer"
					selected={selected}
					name="edit-volunteer"
					icon={<FaRegHandshake className="icon" />}
					clickFunc={onClick}
				/>

				<EditProfileButton
					text="References"
					selected={selected}
					name="edit-references"
					icon={<FaLink className="icon" />}
					clickFunc={onClick}
				/>
				<EditProfileButton
					text="Languages"
					selected={selected}
					name="edit-languages"
					icon={<FaAssistiveListeningSystems className="icon" />}
					clickFunc={onClick}
				/>
				<EditProfileButton
					text="Work"
					selected={selected}
					name="edit-work"
					icon={<FaWrench className="icon" />}
					clickFunc={onClick}
				/>

				<EditProfileButton
					text="Education"
					selected={selected}
					name="edit-education"
					icon={<FaUserGraduate className="icon" />}
					clickFunc={onClick}
				/>

				<EditProfileButton
					text="Delete Profile"
					selected={selected}
					name="delete-profile"
					icon={<FaRegTrashAlt className="icon" />}
					clickFunc={deleteClicked}
				/>
			</div>
			<button
				type="button"
				className="edit-profile-popout-menu-button"
				onClick={() => toggleEditMenuOpen()}
			>
				{editMenuOpen ? (
					<FaAngleLeft className="icon" />
				) : (
					<FaAngleRight className="icon" />
				)}
			</button>
		</div>
	);
}

EditMenu.propTypes = {
	selected: PropTypes.string.isRequired,
	setSelected: PropTypes.func.isRequired,
	deleteProfile: PropTypes.func.isRequired,
	clearAlerts: PropTypes.func.isRequired,
};

export default connect(null, { deleteProfile, clearAlerts })(EditMenu);
