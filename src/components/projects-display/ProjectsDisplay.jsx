import React from 'react';

import './projects-display.scss';
import PropTypes from 'prop-types';
import { FaClipboardCheck } from 'react-icons/fa';

import ClickableInfoLine from '../clickable-info-line/ClickableInfoLine';
import InfoLine from '../info-line/InfoLine';
import ProfileTabs from '../profile-tabs/ProfileTabs';

function ProjectsDisplay({ profileToView, profileInfo, width }) {
	const { profileBeingViewed } = profileToView;

	const projects = profileBeingViewed.projects || [];
	const projectsTabSelected = profileInfo === 'Projects';
	const hasProjects = projects.length > 0;

	return (projectsTabSelected || width < 769) && hasProjects ? (
		<div className='section'>
			{width < 769 && (
				<ProfileTabs
					name='Projects'
					icon={<FaClipboardCheck className='icon' />}
				/>
			)}
			<div
				className={`mobile-revealer-wrapper ${
					projectsTabSelected ? 'reveal-info ' : null
				}`}>
				<div className='sub-section-wrapper'>
					<p className='section-title'>Projects</p>
					{projects.map(({ projectName, link, tools, description, _id }) => {
						return (
							projectName && (
								<div className='sub-section' key={_id}>
									<InfoLine title='Project Name' info={projectName} />

									{link && <ClickableInfoLine title='Link' info={link} />}

									{tools.length && (
										<div className='info-line '>
											<p className='info-line-title'>Tools:</p>
											<div className='tools-info-line'>
												{tools.map((tool) => (
													<p className='tool'>{tool}</p>
												))}
											</div>
										</div>
									)}

									{description && (
										<InfoLine title='Description' info={description} />
									)}
								</div>
							)
						);
					})}
				</div>
			</div>
		</div>
	) : null;
}

ProjectsDisplay.propTypes = {
	profileToView: PropTypes.object.isRequired,
	profileInfo: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
};

export default ProjectsDisplay;
