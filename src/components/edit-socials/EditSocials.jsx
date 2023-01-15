import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import './edit-socials.scss';
import AddFieldButton from '../add-field-button/AddFieldButton';
import InputContainer from '../input-container/InputContainer';
import SectionTitle from '../section-title/SectionTitle';

function EditSocials({ myProfile, saveProfile, selected }) {
	const MAX_NUMBER_OF_WEBSITES = 4;
	const MAX_NUMBER_OF_PROFILES = 3;

	const websites = myProfile.websites || [];
	const profiles = myProfile.profiles || [];

	const [numberOfWebsites, setNumberOfWebsites] = useState(
		websites.length || 1
	);
	const [numberOfProfiles, setNumberOfProfiles] = useState(
		profiles.length || 1
	);

	const websiteObj1 = websites[0] || {};
	const website1 = websiteObj1.website || '';

	const websiteObj2 = websites[1] || {};
	const website2 = websiteObj2.website || '';

	const websiteObj3 = websites[2] || {};
	const website3 = websiteObj3.website || '';

	const websiteObj4 = websites[3] || {};
	const website4 = websiteObj4.website || '';

	const profile1 = profiles[0] || {};
	const network1 = profile1.network || '';
	const username1 = profile1.username || '';
	const url1 = profile1.url || '';

	const profile2 = profiles[1] || {};
	const network2 = profile2.network || '';
	const username2 = profile2.username || '';
	const url2 = profile2.url || '';

	const profile3 = profiles[2] || {};
	const network3 = profile3.network || '';
	const username3 = profile3.username || '';
	const url3 = profile3.url || '';

	// watch, errors
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			website1,
			website2,
			website3,
			website4,
			network1,
			username1,
			url1,
			network2,
			username2,
			url2,
			network3,
			username3,
			url3,
		},
	});

	const addWebsite = () => {
		if (numberOfWebsites < MAX_NUMBER_OF_WEBSITES) {
			setNumberOfWebsites(numberOfWebsites + 1);
		}
	};

	const addProfile = () => {
		if (numberOfProfiles < MAX_NUMBER_OF_PROFILES) {
			setNumberOfProfiles(numberOfProfiles + 1);
		}
	};

	const onSubmit = (formData) => {
		const formEntries = Object.entries(formData);
		let newNumberOfWebsites = 0;
		let newNumberOfProfiles = 0;

		formEntries.forEach(([key, value]) => {
			setValue(key, value);
			if (key.includes('website') && value) newNumberOfWebsites += 1;
			if (key.includes('network') && value) newNumberOfProfiles += 1;
		});

		setNumberOfWebsites(newNumberOfWebsites);
		setNumberOfProfiles(newNumberOfProfiles);
		saveProfile(formData, 'socials');
	};

	return (
		selected === 'edit-socials' && (
			<div className="edit-socials  edit-section-container">
				<form className="socials-form" onSubmit={handleSubmit(onSubmit)}>
					<SectionTitle text="Socials" />

					{/* Personal Sites */}
					<div className="addable-edit-input">
						<InputContainer
							text="Personal Website"
							name="website1"
							register={register}
						/>
					</div>

					{numberOfWebsites >= 2 && (
						<div className="addable-edit-input">
							<InputContainer
								text="Personal Website"
								name="website2"
								register={register}
							/>
						</div>
					)}

					{numberOfWebsites >= 3 && (
						<div className="addable-edit-input">
							<InputContainer
								text="Personal Website"
								name="website3"
								register={register}
							/>
						</div>
					)}

					{numberOfWebsites >= 4 && (
						<div className="addable-edit-input">
							<InputContainer
								text="Personal Website"
								name="website4"
								register={register}
							/>
						</div>
					)}

					{numberOfWebsites < MAX_NUMBER_OF_WEBSITES && (
						<AddFieldButton onClickFunc={addWebsite} />
					)}

					{/* Networks */}
					<div className="margin-top  addable-edit-input">
						<InputContainer
							text="Network"
							name="network1"
							register={register}
						/>
						<InputContainer
							text="Username"
							name="username1"
							register={register}
						/>
						<InputContainer text="Url" name="url1" register={register} />
					</div>

					{numberOfProfiles >= 2 && (
						<div className="margin-top  addable-edit-input">
							<InputContainer
								text="Network"
								name="network2"
								register={register}
							/>
							<InputContainer
								text="Username"
								name="username2"
								register={register}
							/>
							<InputContainer text="Url" name="url2" register={register} />
						</div>
					)}
					{numberOfProfiles >= 3 && (
						<div className="margin-top  addable-edit-input">
							<InputContainer
								text="Network"
								name="network3"
								register={register}
							/>
							<InputContainer
								text="Username"
								name="username3"
								register={register}
							/>
							<InputContainer text="Url" name="url3" register={register} />
						</div>
					)}

					{numberOfProfiles < MAX_NUMBER_OF_PROFILES && (
						<AddFieldButton onClickFunc={addProfile} />
					)}
				</form>
			</div>
		)
	);
}

EditSocials.defaultProps = {
	myProfile: {},
};

EditSocials.propTypes = {
	myProfile: PropTypes.object,
	saveProfile: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

export default EditSocials;
