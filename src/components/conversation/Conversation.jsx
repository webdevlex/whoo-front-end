/* eslint-disable */

import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './conversation.scss';
import noConversationIcon from '../../assets/images/no-conversation-selected.svg';
import ConversationInput from '../conversation-input/ConversationInput';
import ConversationMessages from '../conversation-messages/ConversationMessages';
import ConversationTitle from '../conversation-title/ConversationTitle';

function Conversation({ thread }) {
	const { selectedThread } = thread;

	const conversation = (
		<>
			{selectedThread === 0 ? (
				<div className="conversation" />
			) : (
				<ConversationMessages />
			)}
		</>
	);

	return (
		<div className="conversations-container">
			{selectedThread === null ? (
				<div className="no-conversation-container">
					<img
						className="no-conversation-icon"
						src={noConversationIcon}
						alt="no conversation selected"
					/>
					<p className="no-conversation-selected-text">
						No Coversation Selected
					</p>
				</div>
			) : (
				<>
					<ConversationTitle />
					{conversation}
					<ConversationInput />
				</>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	thread: state.thread,
});

Conversation.propTypes = {
	thread: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(Conversation);
