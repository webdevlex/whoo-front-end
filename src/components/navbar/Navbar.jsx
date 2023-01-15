/* eslint-disable */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './navbar.scss';
import logo from '../../assets/images/whoo-logo-with-text.svg';
import NavLinks from '../nav-links/NavLinks';

function Navbar({ isAuthenticated, isLoading, onProfileEditPage }) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div className={`navbar ${onProfileEditPage ? 'full-width' : null}`}>
			<div className="container">
				<Link to="/" className="link-to-hompage">
					<img className="logo" src={logo} alt="company logo" />
				</Link>
				<NavLinks setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	isLoading: state.auth.isLoading,
	onProfileEditPage: state.navigation.onEditProfilePage,
});

Navbar.defaultProps = {
	isAuthenticated: false,
};

Navbar.propTypes = {
	isAuthenticated: PropTypes.bool,
	isLoading: PropTypes.bool.isRequired,
	onProfileEditPage: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {})(Navbar);
