import React, { useState } from 'react';

import './signup-form.scss';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { connect } from 'react-redux';

import { registerUser } from '../../redux/actions/auth';
import SignInAndUpErrors from '../sign-in-and-up-error/SignInAndUpErrors';
import TestWebsite from '../test-website/TestWebsite';

function SignupForm({ registerUser }) {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		setError,
		formState: { errors },
	} = useForm();

	const [passwordShown, setPasswordShown] = useState(true);
	const [confirmPasswordShown, setConfirmPasswordShown] = useState(true);

	const togglePasswordVisiblity = () => {
		const passwordValue = getValues('password');
		if (passwordValue !== 'Password') setPasswordShown(!passwordShown);
	};

	const toggleConfirmPasswordVisiblity = () => {
		const confirmPasswordValue = getValues('confirmPassword');
		if (confirmPasswordValue !== 'Confirm Password')
			setConfirmPasswordShown(!confirmPasswordShown);
	};

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const onSubmit = async (formData) => {
		const { email, password, confirmPassword } = formData;
		const validEmail = validateEmail(email.trim());
		const validPassword = password.trim() !== '' && password !== 'Password';
		const validConfirmPassword =
			password.trim() !== '' && confirmPassword !== 'Confirm Password';

		if (!validEmail || !validPassword || !validConfirmPassword) {
			if (!validEmail) {
				setError('email', {
					type: 'Not a valid email',
				});
			}
			if (!validPassword) {
				setError('password', {
					type: 'Not a valid password',
				});
			}
			if (!validConfirmPassword) {
				setError('confirmPassword', {
					type: 'Not a valid confirm password',
				});
			}
		} else {
			registerUser(formData);
		}
	};

	const handleFocus = (e) => {
		const target = e.target.name;
		const emailValue = getValues('email');
		const passwordValue = getValues('password');
		const confirmPasswordValue = getValues('confirmPassword');

		if (emailValue === 'Email' && target === 'email') {
			setValue('email', '');
		}
		if (passwordValue === 'Password' && target === 'password') {
			setValue('password', '');
			setPasswordShown(false);
		}
		if (
			confirmPasswordValue === 'Confirm Password' &&
			target === 'confirmPassword'
		) {
			setValue('confirmPassword', '');
			setConfirmPasswordShown(false);
		}
	};

	const handleBlur = () => {
		const emailValue = getValues('email');
		const passwordValue = getValues('password');
		const confirmPasswordValue = getValues('confirmPassword');

		if (emailValue === '') {
			setValue('email', 'Email');
		}
		if (passwordValue === '') {
			setValue('password', 'Password');
			setPasswordShown(true);
		}
		if (confirmPasswordValue === '') {
			setValue('confirmPassword', 'Confirm Password');
			setConfirmPasswordShown(true);
		}
	};

	return (
		<form className='sign-up-form' onSubmit={handleSubmit(onSubmit)}>
			<input
				aria-invalid={errors.email ? 'true' : 'false'}
				type='text'
				className='input email-input'
				defaultValue='Email'
				{...register('email', { required: true })}
				onFocus={(e) => handleFocus(e)}
				onBlur={(e) => handleBlur(e)}
			/>
			<div className='password-input'>
				<input
					aria-invalid={errors.password ? 'true' : 'false'}
					type={passwordShown ? 'text' : 'password'}
					className='input'
					defaultValue='Password'
					{...register('password', { required: true })}
					onFocus={(e) => handleFocus(e)}
					onBlur={(e) => handleBlur(e)}
				/>
				<FaEye
					onClick={() => togglePasswordVisiblity()}
					className='see-password-button'
				/>
			</div>
			<div className='password-input'>
				<input
					aria-invalid={errors.confirmPassword ? 'true' : 'false'}
					type={confirmPasswordShown ? 'text' : 'password'}
					className='input'
					defaultValue='Confirm Password'
					{...register('confirmPassword', { required: true })}
					onFocus={(e) => handleFocus(e)}
					onBlur={(e) => handleBlur(e)}
				/>
				<FaEye
					onClick={() => toggleConfirmPasswordVisiblity()}
					className='see-password-button'
				/>
			</div>

			<SignInAndUpErrors />
			<input type='submit' className='create-button' value='Create Account' />
			<TestWebsite />
		</form>
	);
}

SignupForm.propTypes = {
	registerUser: PropTypes.func.isRequired,
};

export default connect(null, { registerUser })(SignupForm);
