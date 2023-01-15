import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import './edit-interests.scss';
import AddFieldButton from '../add-field-button/AddFieldButton';
import DoubleInput from '../double-input/DoubleInput';
import SectionTitle from '../section-title/SectionTitle';

function EditInterests({ myProfile, saveProfile, selected }) {
	const MAX_NUMBER_OF_INTERESTS = 5;
	const interests = myProfile.interests || [];
	const [numberOfInterests, setNumberOfInterests] = useState(
		interests.length || 1
	);

	const interests1 = interests[0] || {};
	const interest1 = interests1.interest || '';
	const keywords1 = interests1.keywords || [];

	const interests2 = interests[1] || {};
	const interest2 = interests2.interest || '';
	const keywords2 = interests2.keywords || [];

	const interests3 = interests[2] || {};
	const interest3 = interests3.interest || '';
	const keywords3 = interests3.keywords || [];

	const interests4 = interests[3] || {};
	const interest4 = interests4.interest || '';
	const keywords4 = interests4.keywords || [];

	const interests5 = interests[4] || {};
	const interest5 = interests5.interest || '';
	const keywords5 = interests5.keywords || [];

	// watch, errors
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			interest1,
			keywords1: keywords1.join(', '),
			interest2,
			keywords2: keywords2.join(', '),
			interest3,
			keywords3: keywords3.join(', '),
			interest4,
			keywords4: keywords4.join(', '),
			interest5,
			keywords5: keywords5.join(', '),
		},
	});

	const addInterest = () => {
		if (numberOfInterests < MAX_NUMBER_OF_INTERESTS) {
			setNumberOfInterests(numberOfInterests + 1);
		}
	};

	const onSubmit = (formData) => {
		const formEntries = Object.entries(formData);
		let newNumberOfInterests = 0;

		formEntries.forEach(([key, value]) => {
			setValue(key, value);
			if (key.match('interest') && value) newNumberOfInterests += 1;
		});

		setNumberOfInterests(newNumberOfInterests);
		saveProfile(formData, 'interests');
	};

	return selected === 'edit-interests' ? (
		<div className="edit-interests edit-section-container">
			<form className="interests-form " onSubmit={handleSubmit(onSubmit)}>
				<SectionTitle text="Interests" />

				{/* Intrests */}
				<div className="addable-edit-input">
					<DoubleInput
						text1="Interest"
						name1="interest1"
						text2="Keywords"
						name2="keywords1"
						register={register}
					/>
				</div>

				{numberOfInterests >= 2 && (
					<div className="addable-edit-input">
						<DoubleInput
							text1="Interest"
							name1="interest2"
							text2="Keywords"
							name2="keywords2"
							register={register}
						/>
					</div>
				)}

				{numberOfInterests >= 3 && (
					<div className="addable-edit-input">
						<DoubleInput
							text1="Interest"
							name1="interest3"
							text2="Keywords"
							name2="keywords3"
							register={register}
						/>
					</div>
				)}

				{numberOfInterests >= 4 && (
					<div className="addable-edit-input">
						<DoubleInput
							text1="Interest"
							name1="interest4"
							text2="Keywords"
							name2="keywords4"
							register={register}
						/>
					</div>
				)}

				{numberOfInterests >= 5 && (
					<div className="addable-edit-input">
						<DoubleInput
							text1="Interest"
							name1="interest5"
							text2="Keywords"
							name2="keywords5"
							register={register}
						/>
					</div>
				)}

				{numberOfInterests < MAX_NUMBER_OF_INTERESTS && (
					<AddFieldButton onClickFunc={addInterest} />
				)}
			</form>
		</div>
	) : null;
}

EditInterests.defaultProps = {
	myProfile: PropTypes.object,
};

EditInterests.propTypes = {
	myProfile: PropTypes.object,
	saveProfile: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

export default EditInterests;
