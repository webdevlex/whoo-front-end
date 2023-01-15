import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import './edit-projects.scss';
import AddFieldButton from '../add-field-button/AddFieldButton';
import InputContainer from '../input-container/InputContainer';
import SectionTitle from '../section-title/SectionTitle';

function EditProjects({ myProfile, saveProfile, selected }) {
	const MAX_NUMBER_OF_PROJECTS = 3;
	const projects = myProfile.projects || [];

	const [numberOfProjects, setNumberOfProjects] = useState(
		projects.length || 1
	);

	const project1 = projects[0] || {};
	const project2 = projects[1] || {};
	const project3 = projects[2] || {};

	const projectName1 = project1.projectName || '';
	const projectName2 = project2.projectName || '';
	const projectName3 = project3.projectName || '';

	const link1 = project1.link || '';
	const link2 = project2.link || '';
	const link3 = project3.link || '';

	const tools1 = project1.tools || [];
	const tools2 = project2.tools || [];
	const tools3 = project3.tools || [];

	const description1 = project1.description || '';
	const description2 = project2.description || '';
	const description3 = project3.description || '';

	// watch, errors
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			projectName1,
			projectName2,
			projectName3,
			link1,
			link2,
			link3,
			tools1: tools1.join(', '),
			tools2: tools2.join(', '),
			tools3: tools3.join(', '),
			description1,
			description2,
			description3,
		},
	});

	const addProject = () => {
		if (numberOfProjects < MAX_NUMBER_OF_PROJECTS) {
			setNumberOfProjects(numberOfProjects + 1);
		}
	};

	const onSubmit = (formData) => {
		const formEntries = Object.entries(formData);
		let newNumberOfProjects = 0;

		formEntries.forEach(([key, value]) => {
			setValue(key, value);
			if (key.match('projectName') && value) newNumberOfProjects += 1;
		});

		saveProfile(formData, 'projects');
		setNumberOfProjects(newNumberOfProjects);
	};

	return selected === 'edit-projects' ? (
		<div className="edit-projects edit-section-container">
			<form className="projects-form" onSubmit={handleSubmit(onSubmit)}>
				<SectionTitle text="Projects" />

				<div className="addable-edit-input">
					<InputContainer
						text="Project Name"
						name="projectName1"
						register={register}
					/>
					<InputContainer text="Link" name="link1" register={register} />
					<InputContainer text="Tools" name="tools1" register={register} />
					<InputContainer
						text="Description"
						name="description1"
						register={register}
					/>
				</div>

				{numberOfProjects >= 2 && (
					<div className="margin-top addable-edit-input">
						<InputContainer
							text="Project Name"
							name="projectName2"
							register={register}
						/>
						<InputContainer text="Link" name="link2" register={register} />
						<InputContainer text="Tools" name="tools2" register={register} />
						<InputContainer
							text="Description"
							name="description2"
							register={register}
						/>
					</div>
				)}

				{numberOfProjects >= 3 && (
					<div className="margin-top addable-edit-input">
						<InputContainer
							text="Project Name"
							name="projectName3"
							register={register}
						/>
						<InputContainer text="Link" name="link3" register={register} />
						<InputContainer text="Tools" name="tools3" register={register} />
						<InputContainer
							text="Description"
							name="description3"
							register={register}
						/>
					</div>
				)}

				{numberOfProjects < MAX_NUMBER_OF_PROJECTS && (
					<AddFieldButton onClickFunc={addProject} />
				)}
			</form>
		</div>
	) : null;
}

EditProjects.defaultProps = {
	myProfile: {},
};

EditProjects.propTypes = {
	myProfile: PropTypes.object,
	saveProfile: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

export default EditProjects;
