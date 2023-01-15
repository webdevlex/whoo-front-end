import React, { useEffect } from 'react';

import './nav-links.scss';
import PropTypes from 'prop-types';
import { BiX } from 'react-icons/bi';
import {
	FaBars,
	FaCommentAlt,
	FaUserAlt,
	FaUserCog,
	FaUsers,
	FaList,
	FaSearch,
	FaHome,
	FaRegHandPeace,
	FaUserPlus,
} from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import useWindowSize from '../../hooks/useWindowSize';
import { logoutUser } from '../../redux/actions/auth';
import { getMyProfile } from '../../redux/actions/profile';

function NavLinks({
	hasProfile,
	setMenuOpen,
	menuOpen,
	isAuthenticated,
	myUsername,
	getMyProfile,
	logoutUser,
}) {
	const [width] = useWindowSize();

	useEffect(() => {
		getMyProfile();
	}, []);

	useEffect(() => {
		if (menuOpen && width > 576) {
			closeMenu();
		}
	}, [width]);

	function openMenu() {
		setMenuOpen(true);
		document.body.style.overflow = 'hidden';
	}

	function closeMenu() {
		setMenuOpen(false);
		document.body.style.overflow = 'auto';
	}

	const handleClick = (e) => {
		const linkClicked = e.target.className === 'nav-link';
		if (linkClicked) closeMenu();
	};

	const handleMyProfileClick = () => {
		closeMenu();
		getMyProfile(myUsername);
	};

	const handleLogOut = () => {
		closeMenu();
		logoutUser();
	};

	let menu;
	if (isAuthenticated && hasProfile) {
		menu = (
			<>
				<Link className='nav-link' to='/' onClick={(e) => handleClick(e)}>
					<FaHome className='icon' />
					<span className='menu-link-text'>Home</span>
				</Link>
				<Link className='nav-link' to='/search' onClick={(e) => handleClick(e)}>
					<FaSearch className='icon' />
					<span className='menu-link-text'>Search</span>
				</Link>
				<Link
					className='nav-link'
					to={`/profile/${myUsername}`}
					onClick={() => handleMyProfileClick()}>
					<FaUserAlt className='icon' />
					<span className='menu-link-text'>Profile</span>
				</Link>
				<Link
					className='nav-link'
					to='/edit-profile'
					onClick={(e) => handleClick(e)}>
					<FaUserCog className='icon' />
					<span className='menu-link-text'>Edit Profile</span>
				</Link>
				<Link
					className='nav-link'
					to='/messages'
					onClick={(e) => handleClick(e)}>
					<FaCommentAlt className='icon' />
					<span className='menu-link-text'>Messages</span>
				</Link>
				<Link
					className='nav-link'
					to='/contacts'
					onClick={(e) => handleClick(e)}>
					<FaUsers className='icon' />
					<span className='menu-link-text'>Contacts</span>
				</Link>
				<Link className='nav-link' to='/browse' onClick={(e) => handleClick(e)}>
					<FaList className='icon' />
					<span className='menu-link-text'>Browse</span>
				</Link>
				<button
					type='button'
					className='nav-link logout'
					onClick={() => handleLogOut()}>
					<FaRegHandPeace className='icon' />
					<span className='menu-link-text'>Logout</span>
				</button>
			</>
		);
	} else if (isAuthenticated && !hasProfile) {
		menu = (
			<>
				<Link className='nav-link' to='/' onClick={(e) => handleClick(e)}>
					<FaHome className='icon' />
					<span className='menu-link-text'>Home</span>
				</Link>
				<Link className='nav-link' to='/' onClick={(e) => handleClick(e)}>
					<FaSearch className='icon' />
					<span className='menu-link-text'>Search</span>
				</Link>
				<Link
					className='nav-link'
					to='edit-profile'
					onClick={(e) => handleClick(e)}>
					<FaUserAlt className='icon' />
					<span className='menu-link-text'>Create Profile</span>
				</Link>

				<button
					type='button'
					className='nav-link logout'
					onClick={() => handleLogOut()}>
					<FaRegHandPeace className='icon' />
					<span className='menu-link-text'>Logout</span>
				</button>
			</>
		);
	} else {
		menu = (
			<>
				<Link className='nav-link' to='/' onClick={(e) => handleClick(e)}>
					<FaHome className='icon' />
					<span className='menu-link-text'>Home</span>
				</Link>
				<Link className='nav-link' to='/search' onClick={(e) => handleClick(e)}>
					<FaSearch className='icon' />
					<span className='menu-link-text'>Search</span>
				</Link>
				<Link className='nav-link' to='sign-in' onClick={(e) => handleClick(e)}>
					<FaUserAlt className='icon' />
					<span className='menu-link-text'>Sign In</span>
				</Link>
				<Link
					className='nav-link'
					to='/sign-up'
					onClick={(e) => handleClick(e)}>
					<FaUserPlus className='icon' />
					<span className='menu-link-text'>Sign Up</span>
				</Link>
			</>
		);
	}

	return menuOpen || width > 576 ? (
		<div className='navbar-buttons-container'>
			{menuOpen ? <BiX className='x-icon' onClick={() => closeMenu()} /> : null}
			{menu}
		</div>
	) : (
		<FaBars
			className='nav-bars-icon'
			role='button'
			tabIndex={0}
			onClick={() => openMenu()}
		/>
	);
}

const mapStateToProps = (state) => ({
	hasProfile: state.profile.hasProfile,
	isAuthenticated: state.auth.isAuthenticated,
	menuDisplay: state.navigation.menuDisplay,
	myUsername: state.profile.myUsername,
});

NavLinks.defaultProps = {
	isAuthenticated: false,
	myUsername: '',
};

NavLinks.propTypes = {
	setMenuOpen: PropTypes.func.isRequired,
	menuOpen: PropTypes.bool.isRequired,
	hasProfile: PropTypes.bool.isRequired,
	isAuthenticated: PropTypes.bool,
	myUsername: PropTypes.string,
	getMyProfile: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logoutUser, getMyProfile })(NavLinks);
