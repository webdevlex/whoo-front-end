import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import './edit-awards.scss';
import AddFieldButton from '../add-field-button/AddFieldButton';
import DoubleInput from '../double-input/DoubleInput';
import InputContainer from '../input-container/InputContainer';
import SectionTitle from '../section-title/SectionTitle';

function EditAwards({ myProfile, saveProfile, selected }) {
	const MAX_NUMBER_OF_AWARDS = 3;

	const awards = myProfile.awards || [];
	const [numberOfAwards, setNumberOfAwards] = useState(awards.length || 1);

	const awards1 = awards[0] || {};
	const award1 = awards1.award || '';
	const awarder1 = awards1.awarder || '';
	const date1 = awards1.date || '';
	const website1 = awards1.website || '';
	const summary1 = awards1.summary || '';

	const awards2 = awards[1] || {};
	const award2 = awards2.award || '';
	const awarder2 = awards2.awarder || '';
	const date2 = awards2.date || '';
	const website2 = awards2.website || '';
	const summary2 = awards2.summary || '';

	const awards3 = awards[2] || {};
	const award3 = awards3.award || '';
	const awarder3 = awards3.awarder || '';
	const date3 = awards3.date || '';
	const website3 = awards3.website || '';
	const summary3 = awards3.summary || '';

	// watch, errors
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			award1,
			awarder1,
			date1,
			website1,
			summary1,
			award2,
			awarder2,
			date2,
			website2,
			summary2,
			award3,
			awarder3,
			date3,
			website3,
			summary3,
		},
	});

	const addAward = () => {
		if (numberOfAwards < MAX_NUMBER_OF_AWARDS) {
			setNumberOfAwards(numberOfAwards + 1);
		}
	};

	const onSubmit = (formData) => {
		const formEntries = Object.entries(formData);
		let newNumberOfAwards = 0;

		formEntries.forEach(([key, value]) => {
			setValue(key, value);
			if (key.match('^award(?!er)') && value) newNumberOfAwards += 1;
		});

		saveProfile(formData, 'awards');
		setNumberOfAwards(newNumberOfAwards);
	};

	return selected === 'edit-awards' ? (
		<div className="edit-awards edit-section-container">
			<form className="awards-form" onSubmit={handleSubmit(onSubmit)}>
				<SectionTitle text="Awards" />

				{/* Awards  */}
				<div className="addable-edit-input no-margin-top">
					<InputContainer text="Award" name="award1" register={register} />
					<DoubleInput
						text1="Awarder"
						name1="awarder1"
						text2="Date"
						name2="date1"
						register={register}
					/>
					<InputContainer text="Website" name="website1" register={register} />
					<InputContainer text="Summary" name="summary1" register={register} />
				</div>

				{numberOfAwards >= 2 && (
					<div className="margin-top addable-edit-input">
						<InputContainer text="Award" name="award2" register={register} />
						<DoubleInput
							text1="Awarder"
							name1="awarder2"
							text2="Date"
							name2="date2"
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

				{numberOfAwards >= 3 && (
					<div className="margin-top addable-edit-input">
						<InputContainer text="Award" name="award3" register={register} />
						<DoubleInput
							text1="Awarder"
							name1="awarder3"
							text2="Date"
							name2="date3"
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

				{numberOfAwards < MAX_NUMBER_OF_AWARDS && (
					<AddFieldButton onClickFunc={addAward} />
				)}
			</form>
		</div>
	) : null;
}

EditAwards.defaultProps = {
	myProfile: {},
};

EditAwards.propTypes = {
	myProfile: PropTypes.object,
	saveProfile: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

export default EditAwards;
