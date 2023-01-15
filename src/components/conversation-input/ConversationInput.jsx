import React from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';
import { MdChatBubble } from 'react-icons/md';
import { connect } from 'react-redux';

import './conversation-input.scss';
import { sendMessage, clearNewThread } from '../../redux/actions/thread';

function ConversationInput({ thread, myProfile, sendMessage }) {
	const { newThreadProfiles, selectedThread } = thread;
	const { register, handleSubmit, reset } = useForm({
		defaultValues: { message: 'Type your message here' },
	});

	const onSubmit = (formData) => {
		const message = formData.message.trim();
		reset({ message: 'Type your message here' });
		document.activeElement.blur();
		if (message !== 'Type your message here' && message !== '') {
			const recipients = [...newThreadProfiles, myProfile.user];
			sendMessage(
				formData,
				recipients,
				selectedThread,
				myProfile.basics.fullName,
				myProfile.basics.username
			);
		}
	};

	const onFocus = (event) => {
		event.preventDefault();
		const {
			target: { value },
		} = event;

		if (value === 'Type your message here') {
			event.target.value = '';
		}
	};

	const onBlur = (event) => {
		event.preventDefault();
		const {
			target: { value },
		} = event;

		if (value === '') {
			event.target.value = 'Type your message here';
		}
	};

	return selectedThread !== null ? (
		<form className='text-box' onSubmit={handleSubmit(onSubmit)}>
			<div className='line' />
			<div className='bottom'>
				<MdChatBubble className='icon' />
				<input
					type='text'
					className='input'
					defaultValue='Type your message here'
					{...register('message', { required: true })}
					onFocus={(event) => onFocus(event)}
					onBlur={(event) => onBlur(event)}
				/>
				<button type='submit' className='send-button'>
					<FaArrowUp className='icon' />
				</button>
			</div>
		</form>
	) : null;
}

const mapStateToProps = (state) => ({
	thread: state.thread,
	myProfile: state.profile.myProfile,
});

ConversationInput.propTypes = {
	thread: PropTypes.object.isRequired,
	myProfile: PropTypes.object.isRequired,
	sendMessage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { sendMessage, clearNewThread })(
	ConversationInput
);
