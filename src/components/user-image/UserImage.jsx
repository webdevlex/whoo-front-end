import React from 'react';

import PropTypes from 'prop-types';

import './user-image.scss';
import defaultImage from '../../assets/images/default-user-image.svg';

function UserImage({ src }) {
	return (
		<img
			className="user-img"
			type="image"
			src={src || defaultImage}
			alt="User"
		/>
	);
}

UserImage.defaultProps = {
	src: '',
};

UserImage.propTypes = {
	src: PropTypes.string,
};

export default UserImage;
