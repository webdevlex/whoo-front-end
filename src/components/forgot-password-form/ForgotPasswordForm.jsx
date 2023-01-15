import React from 'react';

import './forgot-password-form.scss';
import { useForm } from 'react-hook-form';

function ForgotPasswordForm() {
	const { register, handleSubmit } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: { email: 'Email' },
	});

	const onSubmit = (data) => alert(`Email: ${data.email}`);

	const onFocus = ({ target }) => {
		if (target.value === 'Email') {
			target.value = '';
		}
	};

	const onBlur = ({ target }) => {
		if (target.value === '') {
			if (target.name === 'email') {
				target.value = 'Email';
			}
		}
	};
	return (
		<form className="forgot-password-form" onSubmit={handleSubmit(onSubmit)}>
			<input
				type="text"
				className="input"
				name="email"
				ref={register}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
			<input type="submit" className="submit-button" value="Submit" />
		</form>
	);
}

export default ForgotPasswordForm;
