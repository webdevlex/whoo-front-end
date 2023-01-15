import { addUserAsContact } from './contacts';
import { sendDefaultMessage } from './thread';

export const setDefaults = () => (dispatch, getState) => {
	const currentUserId = getState().profile.myProfile.user;
	dispatch(addUserAsContact('webdevlex'));
	dispatch(
		sendDefaultMessage(
			{ message: 'Welcome to whoo!' },
			['61e352500d22e1189a6c92b0', currentUserId],
			0
		)
	);
};

export default setDefaults;
