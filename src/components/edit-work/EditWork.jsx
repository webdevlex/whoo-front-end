import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import './edit-work.scss';
import AddFieldButton from '../add-field-button/AddFieldButton';
import InputContainer from '../input-container/InputContainer';
import NestedDoubleInput from '../nested-double-input/NestedDoubleInput';
import SectionTitle from '../section-title/SectionTitle';

function EditWork({ myProfile, saveProfile, selected }) {
	const MAX_NUMBER_OF_WORK = 3;

	const work = myProfile.work || [];
	const [numberOfWork, setNumberOfWork] = useState(work.length || 1);

	const work1 = work[0] || {};
	const work2 = work[1] || {};
	const work3 = work[2] || {};

	const company1 = work1.company || '';
	const company2 = work2.company || '';
	const company3 = work3.company || '';

	const priority1 = work1.priority || '';
	const priority2 = work2.priority || '';
	const priority3 = work3.priority || '';

	const position1 = work1.position || '';
	const position2 = work2.position || '';
	const position3 = work3.position || '';

	const website1 = work1.website || '';
	const website2 = work2.website || '';
	const website3 = work3.website || '';

	const startDate1 = work1.startDate || '';
	const startDate2 = work2.startDate || '';
	const startDate3 = work3.startDate || '';

	const endDate1 = work1.endDate || '';
	const endDate2 = work2.endDate || '';
	const endDate3 = work3.endDate || '';

	// watch, errors
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			company1,
			company2,
			company3,
			priority1,
			priority2,
			priority3,
			position1,
			position2,
			position3,
			website1,
			website2,
			website3,
			startDate1,
			startDate2,
			startDate3,
			endDate1,
			endDate2,
			endDate3,
		},
	});

	const addWork = () => {
		if (numberOfWork < MAX_NUMBER_OF_WORK) {
			setNumberOfWork(numberOfWork + 1);
		}
	};

	const onSubmit = (formData) => {
		const formEntries = Object.entries(formData);
		let newNumberOfWork = 0;

		formEntries.forEach(([key, value]) => {
			setValue(key, value);
			if (key.match('company') && value) newNumberOfWork += 1;
		});

		saveProfile(formData, 'work');
		setNumberOfWork(newNumberOfWork);
	};

	return selected === 'edit-work' ? (
		<div className="edit-work edit-section-container">
			<form className="work-form" onSubmit={handleSubmit(onSubmit)}>
				<SectionTitle text="Work Experience" />

				{/* Work */}
				<div className="addable-edit-input">
					<InputContainer text="Company" name="company1" register={register} />
					<InputContainer
						text="Priority"
						name="priority1"
						register={register}
					/>
					<NestedDoubleInput
						text1="Job Title"
						name1="position1"
						text2="Start Date"
						name2="startDate1"
						text3="End Date"
						name3="endDate1"
						register={register}
					/>
					<InputContainer text="Website" name="website1" register={register} />
				</div>
				{numberOfWork >= 2 && (
					<div className="margin-top addable-edit-input">
						<InputContainer
							text="Company"
							name="company2"
							register={register}
						/>
						<InputContainer
							text="Priority"
							name="priority2"
							register={register}
						/>
						<NestedDoubleInput
							text1="Job Title"
							name1="position2"
							text2="Start Date"
							name2="startDate2"
							text3="End Date"
							name3="endDate2"
							register={register}
						/>
						<InputContainer
							text="Website"
							name="website2"
							register={register}
						/>
					</div>
				)}
				{numberOfWork >= 3 && (
					<div className="margin-top addable-edit-input">
						<InputContainer
							text="Company"
							name="company3"
							register={register}
						/>
						<InputContainer
							text="Priority"
							name="priority3"
							register={register}
						/>
						<NestedDoubleInput
							text1="Job Title"
							name1="position3"
							text2="Start Date"
							name2="startDate3"
							text3="End Date"
							name3="endDate3"
							register={register}
						/>
						<InputContainer
							text="Website"
							name="website3"
							register={register}
						/>
					</div>
				)}
				{numberOfWork < MAX_NUMBER_OF_WORK && (
					<AddFieldButton onClickFunc={addWork} />
				)}
			</form>
		</div>
	) : null;
}

EditWork.defaultProps = {
	myProfile: {},
};

EditWork.propTypes = {
	myProfile: PropTypes.object,
	saveProfile: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

export default EditWork;
