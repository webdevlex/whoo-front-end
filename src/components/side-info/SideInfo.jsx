import React, { useContext } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './side-info.scss';
import { ProfileInfoContext } from '../../contexts/profileInfoContext';
import useWindowSize from '../../hooks/useWindowSize';
import EducatonContainer from '../education-container/EducationContainer';
import UserImage from '../user-image/UserImage';
import WorkContainer from '../work-container/WorkContainer';

function SideInfo({ profileToView }) {
	const [width] = useWindowSize();
	const [profileInfo] = useContext(ProfileInfoContext);
	const {
		profileBeingViewed: { work, education },
	} = profileToView;

	const pictureUrl = profileToView.profileBeingViewed.pictureUrl || '';

	return (
		<div className="side-info">
			{width >= 769 && (
				<div className="profile-picture-container">
					<UserImage src={pictureUrl} />
				</div>
			)}

			<WorkContainer profileInfo={profileInfo} work={work} width={width} />
			<EducatonContainer
				profileInfo={profileInfo}
				education={education}
				width={width}
			/>
		</div>
	);
}

const mapStateToProps = (state) => ({
	profileToView: state.profileToView,
});

SideInfo.propTypes = {
	profileToView: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(SideInfo);
