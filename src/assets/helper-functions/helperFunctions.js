/* eslint-disable */
export function messagesMoreThanAnHourApart(
	olderMessageTimeStamp,
	newerMessageTimeStamp
) {
	const messagesSentOnSameDate = messagesOnSameDate(
		olderMessageTimeStamp,
		newerMessageTimeStamp
	);
	const messagesSentInTheSameHour = messagesInSameHour(
		olderMessageTimeStamp,
		newerMessageTimeStamp
	);

	return messagesSentInTheSameHour && messagesSentOnSameDate;
}

function messagesOnSameDate(olderMessageTimeStamp, newerMessageTimeStamp) {
	const olderDate = new Date(olderMessageTimeStamp).toDateString();
	const newerDate = new Date(newerMessageTimeStamp).toDateString();
	return olderDate === newerDate;
}

function messagesInSameHour(olderMessageTimeStamp, newerMessageTimeStamp) {
	let olderHours = Math.floor((olderMessageTimeStamp / (1000 * 60 * 60)) % 24);
	olderHours = olderHours < 10 ? '0' + olderHours : olderHours;
	let olderMinutes = Math.floor((olderMessageTimeStamp / (1000 * 60)) % 60);
	olderMinutes = olderMinutes < 10 ? '0' + olderMinutes : olderMinutes;

	let newerHours = Math.floor((newerMessageTimeStamp / (1000 * 60 * 60)) % 24);
	newerHours = newerHours < 10 ? '0' + newerHours : newerHours;
	let newerMinutes = Math.floor((newerMessageTimeStamp / (1000 * 60)) % 60);
	newerMinutes = newerMinutes < 10 ? '0' + newerMinutes : newerMinutes;

	const timeDifference = Math.abs(newerHours - olderHours);

	if (timeDifference === 0) {
		return true;
	} else if (timeDifference === 1) {
		return newerMinutes < olderMinutes;
	}
	return false;
}

export function formatDate(date) {
	return (
		(date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
		'/' +
		(date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
		'/' +
		date.getFullYear()
	);
}

export function formatTime(date) {
	let hour = date.getHours();
	let minute = date.getMinutes();
	hour = hour < 10 ? '0' + hour : '' + hour;
	minute = minute < 10 ? '0' + minute : '' + minute;
	const time = hour + minute;

	return getFormattedTime(time);
}

var getFormattedTime = function (fourDigitTime) {
	const hours24 = parseInt(fourDigitTime.substring(0, 2));
	const hours = ((hours24 + 11) % 12) + 1;
	const amPm = hours24 > 11 ? 'PM' : 'AM';
	const minutes = fourDigitTime.substring(2);

	return `${hours}:${minutes} ${amPm}`;
};
