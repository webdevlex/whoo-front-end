import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './main-info.scss';
import BottomLine from '../bottom-line/BottomLine';
import CenterBottom from '../center-bottom/CenterBottom';
import CenterTop from '../center-top/CenterTop';
import TopLine from '../top-line/TopLine';

function MainInfo({ profileBeingViewed }) {
	return (
		<div className="main-info">
			<TopLine profileBeingViewed={profileBeingViewed} />
			<CenterTop profileBeingViewed={profileBeingViewed} />
			<CenterBottom />
			<BottomLine profileBeingViewed={profileBeingViewed} />
		</div>
	);
}

const mapStateToProps = (state) => ({
	profileBeingViewed: state.profileToView.profileBeingViewed,
});

MainInfo.propTypes = {
	profileBeingViewed: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(MainInfo);
