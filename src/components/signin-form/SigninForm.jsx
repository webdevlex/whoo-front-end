import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { connect } from 'react-redux';

import './signin-form.scss';
import { loginUser } from '../../redux/actions/auth';
import SignInAndUpErrors from '../sign-in-and-up-error/SignInAndUpErrors';
import TestWebsite from '../test-website/TestWebsite';

function SigninForm({ loginUser }) {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		setError,
		formState: { errors },
	} = useForm();

	const [passwordShown, setPasswordShown] = useState(true);

	const togglePasswordVisiblity = () => {
		const passwordValue = getValues('password');
		if (passwordValue !== 'Password') setPasswordShown(!passwordShown);
	};

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const onSubmit = async (formData) => {
		const { email, password } = formData;
		const validEmail = validateEmail(email.trim());
		const validPassword = password.trim() !== '' && password !== 'Password';

		if (!validEmail || !validPassword) {
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
		} else {
			loginUser(formData);
		}
	};

	const handleFocus = (e) => {
		const target = e.target.name;
		const emailValue = getValues('email');
		const passwordValue = getValues('password');

		if (emailValue === 'Email' && target === 'email') {
			setValue('email', '');
		}
		if (passwordValue === 'Password' && target === 'password') {
			setValue('password', '');
			setPasswordShown(false);
		}
	};

	const handleBlur = () => {
		const emailValue = getValues('email');
		const passwordValue = getValues('password');

		if (emailValue === '') {
			setValue('email', 'Email');
		}
		if (passwordValue === '') {
			setValue('password', 'Password');
			setPasswordShown(true);
		}
	};
	return (
		<form className='sign-in-form' onSubmit={handleSubmit(onSubmit)}>
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

			<SignInAndUpErrors />
			<input type='submit' className='sign-in-button' value='Sign In' />
			<TestWebsite />
		</form>
	);
}

SigninForm.propTypes = {
	loginUser: PropTypes.func.isRequired,
};

export default connect(null, { loginUser })(SigninForm);
