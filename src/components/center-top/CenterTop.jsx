import React from 'react';

import './center-top.scss';
import PropTypes from 'prop-types';

function CenterTop({ profileBeingViewed }) {
	const { skills = [] } = profileBeingViewed;

	return (
		<div className="center-top-line">
			<p className="skills-list-title">SKILLS</p>
			<ul className="skills-list-container">
				{skills.length ? (
					skills.map((skill) => (
						<li key={skill} className="skills-list-item">
							{skill}
						</li>
					))
				) : (
					<li className="skills-list-item">No Skills Added</li>
				)}
			</ul>
		</div>
	);
}

CenterTop.propTypes = {
	profileBeingViewed: PropTypes.shape({
		skills: PropTypes.array,
	}).isRequired,
};

export default CenterTop;
