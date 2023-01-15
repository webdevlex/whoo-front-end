import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import './edit-education.scss';
import AddFieldButton from '../add-field-button/AddFieldButton';
import InputContainer from '../input-container/InputContainer';
import NestedDoubleInput from '../nested-double-input/NestedDoubleInput';
import SectionTitle from '../section-title/SectionTitle';

function EditEducation({ myProfile, saveProfile, selected }) {
	const skills = myProfile.skills || [];

	const MAX_NUMBER_OF_EDUCATIONS = 3;

	const education = myProfile.education || [];
	const [numberOfEducations, setNumberOfEducations] = useState(
		education.length || 1
	);

	const education1 = education[0] || {};
	const education2 = education[1] || {};
	const education3 = education[2] || {};

	const institution1 = education1.institution || '';
	const institution2 = education2.institution || '';
	const institution3 = education3.institution || '';

	const area1 = education1.area || '';
	const area2 = education2.area || '';
	const area3 = education3.area || '';

	const startDate1 = education1.startDate || '';
	const startDate2 = education2.startDate || '';
	const startDate3 = education3.startDate || '';

	const endDate1 = education1.endDate || '';
	const endDate2 = education2.endDate || '';
	const endDate3 = education3.endDate || '';

	const studyType1 = education1.studyType || '';
	const studyType2 = education2.studyType || '';
	const studyType3 = education3.studyType || '';

	// watch, errors
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			skills: skills.join(', '),
			institution1,
			institution2,
			institution3,
			area1,
			area2,
			area3,
			startDate1,
			startDate2,
			startDate3,
			endDate1,
			endDate2,
			endDate3,
			studyType1,
			studyType2,
			studyType3,
		},
	});

	const addEducation = () => {
		if (numberOfEducations < MAX_NUMBER_OF_EDUCATIONS) {
			setNumberOfEducations(numberOfEducations + 1);
		}
	};

	const onSubmit = (formData) => {
		const formEntries = Object.entries(formData);
		let newNumberOfEducations = 0;

		formEntries.forEach(([key, value]) => {
			setValue(key, value);
			if (key.match('institution') && value) newNumberOfEducations += 1;
		});

		saveProfile(formData, 'education');
		setNumberOfEducations(newNumberOfEducations);
	};

	return selected === 'edit-education' ? (
		<div className="edit-education edit-section-container">
			<form className="education-form" onSubmit={handleSubmit(onSubmit)}>
				<SectionTitle text="Education" />

				<InputContainer text="Skills" name="skills" register={register} />

				<div className="margin-top addable-edit-input">
					<InputContainer
						text="School"
						name="institution1"
						register={register}
					/>
					<NestedDoubleInput
						text1="Area of Study"
						name1="area1"
						text2="Start Date"
						name2="startDate1"
						text3="End Date"
						name3="endDate1"
						register={register}
					/>
					<InputContainer
						text="Degree type"
						name="studyType1"
						register={register}
					/>
				</div>

				{numberOfEducations >= 2 && (
					<div className="margin-top addable-edit-input">
						<InputContainer
							text="School"
							name="institution2"
							register={register}
						/>
						<NestedDoubleInput
							text1="Area of Study"
							name1="area2"
							text2="Start Date"
							name2="startDate2"
							text3="End Date"
							name3="endDate2"
							register={register}
						/>
						<InputContainer
							text="Degree type"
							name="studyType2"
							register={register}
						/>
					</div>
				)}

				{numberOfEducations >= 3 && (
					<div className="margin-top addable-edit-input">
						<InputContainer
							text="School"
							name="institution3"
							register={register}
						/>
						<NestedDoubleInput
							text1="Area of Study"
							name1="area3"
							text2="Start Date"
							name2="startDate3"
							text3="End Date"
							name3="endDate3"
							register={register}
						/>
						<InputContainer
							text="Degree type"
							name="studyType3"
							register={register}
						/>
					</div>
				)}

				{numberOfEducations < MAX_NUMBER_OF_EDUCATIONS && (
					<AddFieldButton onClickFunc={addEducation} />
				)}
			</form>
		</div>
	) : null;
}

EditEducation.defaultProps = {
	myProfile: {},
};

EditEducation.propTypes = {
	myProfile: PropTypes.object,
	saveProfile: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

export default EditEducation;
