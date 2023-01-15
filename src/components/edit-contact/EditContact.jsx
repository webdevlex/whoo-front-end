/* eslint-disable */
import React from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import './edit-contact.scss';
import DoubleInput from '../double-input/DoubleInput';
import InputContainer from '../input-container/InputContainer';
import SectionTitle from '../section-title/SectionTitle';

function EditContact({ myProfile, saveProfile, selected, errors: errorsProp }) {
	const { usernameTaken } = errorsProp;
	const { basics, user } = myProfile;
	const username = basics.username || '';
	const jobTitle = basics.jobTitle || '';
	const firstName = basics.firstName || '';
	const lastName = basics.lastName || '';
	const email = basics.email || '';
	const phone = basics.phone || '';

	const location = basics.location || {};
	const address = location.address || '';
	const postalCode = location.postalCode || '';
	const city = location.city || '';
	const region = location.region || '';

	// watch, errors
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName,
			lastName,
			username,
			jobTitle,
			email,
			phone,
			address,
			city,
			region,
			postalCode,
		},
	});

	const onSubmit = (formData) => {
		const usernameEmpty = formData.username.trim() === '';
		const firstNameEmpty = formData.firstName.trim() === '';
		const lastNameEmpty = formData.lastName.trim() === '';
		if (usernameEmpty) {
			setError('username');
		}
		if (firstNameEmpty) {
			setError('firstName');
		}
		if (lastNameEmpty) {
			setError('lastName');
		}

		formData.user = user;
		saveProfile(formData, 'contact');
	};

	return selected === 'edit-contact' ? (
		<div className="edit-contact edit-section-container">
			<form className="contacts-form" onSubmit={handleSubmit(onSubmit)}>
				<SectionTitle text="Contact" />
				<InputContainer
					text="Username"
					name="username"
					register={register}
					error={usernameTaken || errors.username ? true : false}
				/>
				<InputContainer text="Job Title" name="jobTitle" register={register} />
				<DoubleInput
					text1="First Name"
					name1="firstName"
					error1={errors.firstName ? true : false}
					text2="Last Name"
					name2="lastName"
					error2={errors.lastName ? true : false}
					register={register}
				/>
				<DoubleInput
					text1="Email"
					name1="email"
					text2="Phone"
					name2="phone"
					register={register}
				/>
				<InputContainer text="Address" name="address" register={register} />
				<InputContainer text="City" name="city" register={register} />
				<DoubleInput
					text1="State"
					name1="region"
					text2="Zip"
					name2="postalCode"
					register={register}
				/>
			</form>
		</div>
	) : null;
}

EditContact.defaultProps = {
	usernameTaken: false,
	myProfile: {},
};

EditContact.propTypes = {
	myProfile: PropTypes.object,
	saveProfile: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
	usernameTaken: PropTypes.bool,
	errors: PropTypes.object.isRequired,
};

export default EditContact;
