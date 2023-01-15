/* eslint-disable */

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import './edit-profile-picture.scss';
import ComponentLoading from '../component-loading/ComponentLoading';
import Alerts from '../alerts/Alerts';
import UserImage from '../user-image/UserImage';
import { useForm } from 'react-hook-form';
import { FaExclamationCircle } from 'react-icons/fa';

function EditProfilePicture({
	myProfile,
	saveProfilePicture,
	saveProfileLoading,
	selected,
}) {
	const MAX_FILE_SIZE_IN_MEGABYTES = 2;
	const profileImageUrl = myProfile.pictureUrl;
	const [pictureBeingDisplayed, setPictureBeingDisplayed] =
		useState(profileImageUrl);
	const [fileToBeUploaded, setFileToBeUploaded] = useState(null);
	const [showSaveButton, setShowSaveButton] = useState(false);
	const [showFileSizeTooLarge, setShowFileSizeTooLarge] = useState(false);

	const { handleSubmit } = useForm({});

	const handleClick = () => {
		document.getElementById('choose-file').click();
	};

	const displayImage = (event) => {
		const fileSizeOkay = checkFileSize(event.target.files[0]);
		if (fileSizeOkay) {
			setFileToBeUploaded(event.target.files[0]);
			var file = event.target.files[0];
			var reader = new FileReader();
			reader.onload = function (e) {
				setPictureBeingDisplayed(e.target.result);
			};
			reader.readAsDataURL(file);
			setShowSaveButton(true);
		} else {
			setShowFileSizeTooLarge(true);
			setTimeout(() => setShowFileSizeTooLarge(false), 3000);
		}
	};

	const checkFileSize = (file) => {
		const fileSizeInBytes = file.size;
		const fileSizeInMegaBytes = fileSizeInBytes / 1024 / 1024;
		return fileSizeInMegaBytes < MAX_FILE_SIZE_IN_MEGABYTES;
	};

	const onSubmit = () => {
		saveProfilePicture(fileToBeUploaded);
		setFileToBeUploaded(null);
		setShowSaveButton(false);
	};

	const removeImage = () => {
		setPictureBeingDisplayed('');
		setFileToBeUploaded(null);
		setShowSaveButton(true);
	};

	const handleCancelClick = () => {
		setPictureBeingDisplayed(profileImageUrl);
		setShowSaveButton(false);
	};

	return selected === 'edit-profile-picture' ? (
		<div className="edit-profile-picture">
			<form className="upload-image-form" onSubmit={handleSubmit(onSubmit)}>
				<div className="edit-section-title-container">
					<h1 className="edit-section-title">Profile Picture</h1>

					<div className="title-buttons-container">
						{saveProfileLoading && <ComponentLoading />}
						{showFileSizeTooLarge && (
							<span className="file-size-too-large-text">
								{`File Size Must Be Less Than ${MAX_FILE_SIZE_IN_MEGABYTES}MB`}
								<FaExclamationCircle className="exclamation-icon" />
							</span>
						)}
						<Alerts />
						{showSaveButton && (
							<>
								<div className="alerts-submit-container">
									<input type="submit" className="save-button" value="Save" />
								</div>
								<button
									type="button"
									className="cancel-button"
									onClick={handleCancelClick}
								>
									Cancel
								</button>
							</>
						)}
					</div>
				</div>
				<div className="img-and-buttons-container">
					<div className="img-container">
						<UserImage src={pictureBeingDisplayed} />
					</div>
					{!showSaveButton && !saveProfileLoading && (
						<div className="button-container">
							<input id="choose-file" type="file" onChange={displayImage} />
							<button
								type="button"
								onClick={() => handleClick()}
								className="upload-button"
							>
								Upload Image
							</button>
							{profileImageUrl && (
								<button
									type="button"
									onClick={() => removeImage()}
									className="remove-button"
								>
									Remove Image
								</button>
							)}
						</div>
					)}
				</div>
			</form>
		</div>
	) : null;
}

EditProfilePicture.defaultProps = {
	myProfile: {},
};

EditProfilePicture.propTypes = {
	myProfile: PropTypes.object,
	saveProfilePicture: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

export default EditProfilePicture;
