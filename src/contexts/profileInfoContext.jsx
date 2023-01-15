import React, { useState, createContext } from 'react';

import PropTypes from 'prop-types';

export const ProfileInfoContext = createContext();

export function ProfileInfoProvider({ children }) {
	const [profileInfo, setProfileInfo] = useState('Contact');

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<ProfileInfoContext.Provider value={[profileInfo, setProfileInfo]}>
			{children}
		</ProfileInfoContext.Provider>
	);
}

ProfileInfoProvider.propTypes = {
	children: PropTypes.object.isRequired,
};
