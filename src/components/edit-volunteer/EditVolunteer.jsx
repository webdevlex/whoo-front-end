import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import './edit-volunteer.scss';
import AddFieldButton from '../add-field-button/AddFieldButton';
import InputContainer from '../input-container/InputContainer';
import NestedDoubleInput from '../nested-double-input/NestedDoubleInput';
import SectionTitle from '../section-title/SectionTitle';

function EditVolunteer({ myProfile, saveProfile, selected }) {
	const MAX_NUMBER_OF_VOLUNTEER = 3;

	const volunteer = myProfile.volunteer || [];
	const [numberOfVolunteer, setNumberOfVolunteer] = useState(
		volunteer.length || 1
	);

	const volunteer1 = volunteer[0] || {};
	const volunteer2 = volunteer[1] || {};
	const volunteer3 = volunteer[2] || {};

	const organization1 = volunteer1.organization || '';
	const organization2 = volunteer2.organization || '';
	const organization3 = volunteer3.organization || '';

	const position1 = volunteer1.position || '';
	const position2 = volunteer2.position || '';
	const position3 = volunteer3.position || '';

	const startDate1 = volunteer1.startDate || '';
	const startDate2 = volunteer2.startDate || '';
	const startDate3 = volunteer3.startDate || '';

	const endDate1 = volunteer1.endDate || '';
	const endDate2 = volunteer2.endDate || '';
	const endDate3 = volunteer3.endDate || '';

	const website1 = volunteer1.website || '';
	const website2 = volunteer2.website || '';
	const website3 = volunteer3.website || '';

	const summary1 = volunteer1.summary || '';
	const summary2 = volunteer2.summary || '';
	const summary3 = volunteer3.summary || '';

	// watch, errors
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			organization1,
			organization2,
			organization3,
			position1,
			position2,
			position3,
			startDate1,
			startDate2,
			startDate3,
			endDate1,
			endDate2,
			endDate3,
			website1,
			website2,
			website3,
			summary1,
			summary2,
			summary3,
		},
	});

	const addVolunteer = () => {
		if (numberOfVolunteer < MAX_NUMBER_OF_VOLUNTEER) {
			setNumberOfVolunteer(numberOfVolunteer + 1);
		}
	};

	const onSubmit = (formData) => {
		const formEntries = Object.entries(formData);
		let newNumberOfVolunteer = 0;

		formEntries.forEach(([key, value]) => {
			setValue(key, value);
			if (key.match('organization') && value) newNumberOfVolunteer += 1;
		});

		saveProfile(formData, 'volunteer');
		setNumberOfVolunteer(newNumberOfVolunteer);
	};

	return selected === 'edit-volunteer' ? (
		<div className="edit-volunteer edit-section-container">
			<form className="volunteer-form" onSubmit={handleSubmit(onSubmit)}>
				<SectionTitle text="Volunteer" />

				{/*  Volunteer */}
				<div className="addable-edit-input">
					<InputContainer
						text="Organization"
						name="organization1"
						register={register}
					/>
					<NestedDoubleInput
						text1="Position"
						name1="position1"
						text2="Start Date"
						name2="startDate1"
						text3="End Date"
						name3="endDate1"
						register={register}
					/>
					<InputContainer text="Website" name="website1" register={register} />
					<InputContainer text="Summary" name="summary1" register={register} />
				</div>

				{numberOfVolunteer >= 2 && (
					<div className="margin-top addable-edit-input">
						<InputContainer
							text="Organization"
							name="organization2"
							register={register}
						/>
						<NestedDoubleInput
							text1="Position"
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
						<InputContainer
							text="Summary"
							name="summary2"
							register={register}
						/>
					</div>
				)}

				{numberOfVolunteer >= 3 && (
					<div className="margin-top addable-edit-input">
						<InputContainer
							text="Organization"
							name="organization3"
							register={register}
						/>
						<NestedDoubleInput
							text1="Position"
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
						<InputContainer
							text="Summary"
							name="summary3"
							register={register}
						/>
					</div>
				)}
				{numberOfVolunteer < MAX_NUMBER_OF_VOLUNTEER && (
					<AddFieldButton onClickFunc={addVolunteer} />
				)}
			</form>
		</div>
	) : null;
}

EditVolunteer.defaultProps = {
	myProfile: {},
};

EditVolunteer.propTypes = {
	myProfile: PropTypes.object,
	saveProfile: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

export default EditVolunteer;
