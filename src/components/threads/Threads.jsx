import React, { useState, useEffect } from 'react';

import './threads.scss';
import PropTypes from 'prop-types';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { connect } from 'react-redux';

import useWindowSize from '../../hooks/useWindowSize';
import { openDropdown } from '../../redux/actions/thread';
import RealThreads from '../real-threads/RealThreads';
import TempThread from '../temp-thread/TempThread';
import ThreadTitle from '../thread-title/ThreadTitle';

function Threads({ openDropdown }) {
	const [width] = useWindowSize();
	const [threadsMenuOpen, setThreadsMenuOpen] = useState(false);

	const handleThreadsMenuTabClick = () => {
		openDropdown(null);
		toggleThreadsMenuOpen();
	};

	const toggleThreadsMenuOpen = () => {
		setThreadsMenuOpen((threadsMenuOpen) => !threadsMenuOpen);
	};

	useEffect(() => {
		if (width > 576 && threadsMenuOpen) {
			toggleThreadsMenuOpen();
		}
	}, [width]);

	return (
		<div
			className={`threads ${
				threadsMenuOpen && width < 576 ? 'threads-menu-open' : null
			}`}
		>
			<div className="title-and-threads-container">
				<ThreadTitle />
				<div className="threads-container">
					<TempThread />
					<RealThreads setThreadsMenuOpen={setThreadsMenuOpen} />
				</div>
			</div>
			<button
				type="button"
				className="edit-profile-popout-menu-button"
				onClick={handleThreadsMenuTabClick}
			>
				{threadsMenuOpen ? (
					<FaAngleLeft className="icon" />
				) : (
					<FaAngleRight className="icon" />
				)}
			</button>
		</div>
	);
}

Threads.propTypes = {
	openDropdown: PropTypes.func.isRequired,
};

export default connect(null, {
	openDropdown,
})(Threads);
