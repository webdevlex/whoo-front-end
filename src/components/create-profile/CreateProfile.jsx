/* eslint-disable */
import React from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import './create-profile.scss';
import DoubleInput from '../double-input/DoubleInput';
import InputContainer from '../input-container/InputContainer';
import SectionTitle from '../section-title/SectionTitle';
import { saveProfile } from '../../redux/actions/profile';

function CreateProfile({ saveProfile, usernameTaken }) {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();

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

		saveProfile(formData, 'create');
	};

	return (
		<div className="create-profile">
			<form className="create-profile-form" onSubmit={handleSubmit(onSubmit)}>
				<SectionTitle text="Create Profile" />
				<InputContainer
					text="Username"
					name="username"
					register={register}
					error={usernameTaken || errors.username ? true : false}
				/>
				<DoubleInput
					text1="First Name"
					name1="firstName"
					error1={errors.firstName ? true : false}
					text2="Last Name"
					name2="lastName"
					error2={errors.lastName ? true : false}
					register={register}
				/>
			</form>
		</div>
	);
}

const mapStateToProps = (state) => ({
	usernameTaken: state.errors.usernameTaken,
});

CreateProfile.propTypes = {
	saveProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { saveProfile })(CreateProfile);
