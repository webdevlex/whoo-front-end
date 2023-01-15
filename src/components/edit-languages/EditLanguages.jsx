import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import './edit-languages.scss';
import AddFieldButton from '../add-field-button/AddFieldButton';
import DoubleInput from '../double-input/DoubleInput';
import SectionTitle from '../section-title/SectionTitle';

function EditLanguages({ myProfile, saveProfile, selected }) {
	const MAX_NUMBER_OF_LANGUAGES = 5;

	const languages = myProfile.languages || [];
	const [numberOfLanguages, setNumberOfLanguages] = useState(
		languages.length || 1
	);

	const languages1 = languages[0] || {};
	const languages2 = languages[1] || {};
	const languages3 = languages[2] || {};
	const languages4 = languages[3] || {};
	const languages5 = languages[4] || {};

	const language1 = languages1.language || '';
	const language2 = languages2.language || '';
	const language3 = languages3.language || '';
	const language4 = languages4.language || '';
	const language5 = languages5.language || '';

	const fluency1 = languages1.fluency || '';
	const fluency2 = languages2.fluency || '';
	const fluency3 = languages3.fluency || '';
	const fluency4 = languages4.fluency || '';
	const fluency5 = languages5.fluency || '';

	// watch, errors
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			language1,
			language2,
			language3,
			language4,
			language5,
			fluency1,
			fluency2,
			fluency3,
			fluency4,
			fluency5,
		},
	});

	const addLanguage = () => {
		if (numberOfLanguages < MAX_NUMBER_OF_LANGUAGES) {
			setNumberOfLanguages(numberOfLanguages + 1);
		}
	};

	const onSubmit = (formData) => {
		const formEntries = Object.entries(formData);
		let newNumberOfLanguages = 0;

		formEntries.forEach(([key, value]) => {
			setValue(key, value);
			if (key.match('language') && value) newNumberOfLanguages += 1;
		});

		saveProfile(formData, 'languages');
		setNumberOfLanguages(newNumberOfLanguages);
	};

	return selected === 'edit-languages' ? (
		<div className="edit-languages edit-section-container">
			<form className="languages-form" onSubmit={handleSubmit(onSubmit)}>
				<SectionTitle text="Languages" />

				{/*  Languages */}
				<div className="addable-edit-input">
					<DoubleInput
						text1="Language"
						name1="language1"
						text2="Fluency"
						name2="fluency1"
						register={register}
					/>
				</div>

				{numberOfLanguages >= 2 && (
					<div className="addable-edit-input">
						<DoubleInput
							text1="Language"
							name1="language2"
							text2="Fluency"
							name2="fluency2"
							register={register}
						/>
					</div>
				)}

				{numberOfLanguages >= 3 && (
					<div className="addable-edit-input">
						<DoubleInput
							text1="Language"
							name1="language3"
							text2="Fluency"
							name2="fluency3"
							register={register}
						/>
					</div>
				)}

				{numberOfLanguages >= 4 && (
					<div className="addable-edit-input">
						<DoubleInput
							text1="Language"
							name1="language4"
							text2="Fluency"
							name2="fluency4"
							register={register}
						/>
					</div>
				)}

				{numberOfLanguages >= 5 && (
					<div className="addable-edit-input">
						<DoubleInput
							text1="Language"
							name1="language5"
							text2="Fluency"
							name2="fluency5"
							register={register}
						/>
					</div>
				)}
				{numberOfLanguages < MAX_NUMBER_OF_LANGUAGES && (
					<AddFieldButton onClickFunc={addLanguage} />
				)}
			</form>
		</div>
	) : null;
}

EditLanguages.defaultProps = {
	myProfile: {},
};

EditLanguages.propTypes = {
	myProfile: PropTypes.object,
	saveProfile: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

export default EditLanguages;
