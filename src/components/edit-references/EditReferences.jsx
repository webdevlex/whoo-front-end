import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import './edit-references.scss';
import AddFieldButton from '../add-field-button/AddFieldButton';
import DoubleInput from '../double-input/DoubleInput';
import InputContainer from '../input-container/InputContainer';
import SectionTitle from '../section-title/SectionTitle';

function EditReferences({ myProfile, saveProfile, selected }) {
	const MAX_NUMBER_OF_REFERENCES = 3;

	const references = myProfile.references || [];
	const [numberOfReferences, setNumberOfReferences] = useState(
		references.length || 1
	);

	const reference1 = references[0] || {};
	const reference2 = references[1] || {};
	const reference3 = references[2] || {};

	const name1 = reference1.name || '';
	const name2 = reference2.name || '';
	const name3 = reference3.name || '';

	const email1 = reference1.email || '';
	const email2 = reference2.email || '';
	const email3 = reference3.email || '';

	const phone1 = reference1.phone || '';
	const phone2 = reference2.phone || '';
	const phone3 = reference3.phone || '';

	const website1 = reference1.website || '';
	const website2 = reference2.website || '';
	const website3 = reference3.website || '';

	// watch, errors
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			name1,
			name2,
			name3,
			email1,
			email2,
			email3,
			phone1,
			phone2,
			phone3,
			website1,
			website2,
			website3,
		},
	});

	const addReference = () => {
		if (numberOfReferences < MAX_NUMBER_OF_REFERENCES) {
			setNumberOfReferences(numberOfReferences + 1);
		}
	};

	const onSubmit = (formData) => {
		const formEntries = Object.entries(formData);
		let newNumberOfReferences = 0;

		formEntries.forEach(([key, value]) => {
			setValue(key, value);
			if (key.match('name') && value) newNumberOfReferences += 1;
		});

		saveProfile(formData, 'references');
		setNumberOfReferences(newNumberOfReferences);
	};

	return selected === 'edit-references' ? (
		<div className="edit-references edit-section-container">
			<form className="references-form" onSubmit={handleSubmit(onSubmit)}>
				<SectionTitle text="References" />

				{/* References */}
				<div className="addable-edit-input">
					<InputContainer text="Name" name="name1" register={register} />
					<DoubleInput
						text1="Phone"
						name1="phone1"
						text2="Email"
						name2="email1"
						register={register}
					/>
					<InputContainer text="Website" name="website1" register={register} />
				</div>

				{numberOfReferences >= 2 && (
					<div className="margin-top addable-edit-input">
						<InputContainer text="Name" name="name2" register={register} />
						<DoubleInput
							text1="Phone"
							name1="phone2"
							text2="Email"
							name2="email2"
							register={register}
						/>
						<InputContainer
							text="Website"
							name="website2"
							register={register}
						/>
					</div>
				)}

				{numberOfReferences >= 3 && (
					<div className="margin-top addable-edit-input">
						<InputContainer text="Name" name="name3" register={register} />
						<DoubleInput
							text1="Phone"
							name1="phone3"
							text2="Email"
							name2="email3"
							register={register}
						/>
						<InputContainer
							text="Website"
							name="website3"
							register={register}
						/>
					</div>
				)}

				{numberOfReferences < MAX_NUMBER_OF_REFERENCES && (
					<AddFieldButton onClickFunc={addReference} />
				)}
			</form>
		</div>
	) : null;
}

EditReferences.defaultProps = {
	myProfile: {},
};

EditReferences.propTypes = {
	myProfile: PropTypes.object,
	saveProfile: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

export default EditReferences;
