/* eslint-disable */
import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './conversation-messages.scss';
import UserImage from '../../components/user-image/UserImage';
import {
	formatTime,
	formatDate,
	messagesMoreThanAnHourApart,
} from '../../assets/helper-functions/helperFunctions';
import ComponentLoading from '../../components/component-loading/ComponentLoading';

function ConversationMessages({ thread, myProfile }) {
	const scrollerDummy = useRef();
	const myUser = myProfile.user || '';
	const { selectedThread, threadsLoading, threads, sendingMessageLoading } =
		thread;
	const selectedThreadIndex =
		selectedThread && !threadsLoading
			? threads.findIndex(({ _id }) => _id === selectedThread)
			: null;

	useEffect(() => {
		scrollerDummy.current.scrollIntoView({ behavior: 'smooth' });
	}, [sendingMessageLoading]);

	return (
		<div className='conversation'>
			{!threadsLoading &&
				threads[selectedThreadIndex].messages.map(
					(
						{ _id, from, message, timeSent, fullName, username },
						index,
						array
					) => {
						const previousMessage = array[index - 1] || {};
						const { from: personWhoSentPreviousMessage } = previousMessage;
						const personWhoSentCurrentMessage = from;
						const consecutiveMessagesNotSentBySamePerson =
							personWhoSentPreviousMessage !== personWhoSentCurrentMessage;
						const timePreviousMessageSent = previousMessage.timeSent || 0;
						const datePreviousMessageSent = new Date(timePreviousMessageSent);
						const datePreviousMessageSentFormatted = formatDate(
							datePreviousMessageSent
						);

						const todaysDate = new Date();
						const todaysDateFormatted = formatDate(todaysDate);

						const dateMessageSent = new Date(timeSent);
						const timeMessageSentFormatted = formatTime(dateMessageSent);
						const dateMessageSentFormatted = formatDate(dateMessageSent);
						const messageSentInSameHour = messagesMoreThanAnHourApart(
							timePreviousMessageSent,
							timeSent
						);

						const messagesWereSentToday =
							todaysDateFormatted === dateMessageSentFormatted;
						const previousAndCurrentMessageMoreThanAnHourApart =
							!messageSentInSameHour;

						const previousAndCurrentMessageSentOnDifferentDays =
							datePreviousMessageSentFormatted !== dateMessageSentFormatted;

						return (
							<div className='message-and-timestamp-container' key={_id}>
								{messagesWereSentToday &&
									previousAndCurrentMessageMoreThanAnHourApart && (
										<div className='splitter-line'>
											<span className='line-text'>
												{`Today ${timeMessageSentFormatted}`}
											</span>
										</div>
									)}
								{!messagesWereSentToday &&
									previousAndCurrentMessageSentOnDifferentDays && (
										<div className='splitter-line'>
											<span className='line-text'>
												{`${dateMessageSentFormatted} ${timeMessageSentFormatted}`}
											</span>
										</div>
									)}

								{from !== myUser ? (
									<div className='recipient-message-container'>
										{consecutiveMessagesNotSentBySamePerson ? (
											<>
												<Link
													className='recipient-img'
													to={`/profile/${username}`}>
													<UserImage
														src={
															threads[
																selectedThreadIndex
															].memberProfiles.filter(
																({ user }) => user === from
															)[0].pictureUrl
														}
													/>
												</Link>
												<div className='name-and-message-container'>
													<Link
														to={`/profile/${username}`}
														className='sender-fullname'>
														{fullName}
													</Link>
													<p className='recipient-message message'>{message}</p>
												</div>
											</>
										) : (
											<>
												<div className='message-img-spacer'></div>
												<div className='name-and-message-container'>
													<p className='recipient-message message'>{message}</p>
												</div>
											</>
										)}
									</div>
								) : (
									<div className='user-message-container'>
										<p className='user-message message'>{message}</p>
									</div>
								)}
							</div>
						);
					}
				)}

			{sendingMessageLoading && (
				<div className='messages-loader-wrapper'>
					<ComponentLoading />
				</div>
			)}

			<div ref={scrollerDummy} />
		</div>
	);
}

const mapStateToProps = (state) => ({
	thread: state.thread,
	myProfile: state.profile.myProfile,
});

ConversationMessages.propTypes = {
	thread: PropTypes.object.isRequired,
	myProfile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(ConversationMessages);
