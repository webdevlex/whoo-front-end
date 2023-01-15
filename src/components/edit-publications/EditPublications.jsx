import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import './edit-publications.scss';
import AddFieldButton from '../add-field-button/AddFieldButton';
import DoubleInput from '../double-input/DoubleInput';
import InputContainer from '../input-container/InputContainer';
import SectionTitle from '../section-title/SectionTitle';

function EditPublications({ myProfile, saveProfile, selected }) {
	const MAX_NUMBER_OF_PUBLICATIONS = 3;

	const publications = myProfile.publications || [];
	const [numberOfPublications, setNumberOfPublications] = useState(
		publications.length || 1
	);

	const publication1 = publications[0] || {};
	const publication2 = publications[1] || {};
	const publication3 = publications[2] || {};

	const title1 = publication1.title || '';
	const title2 = publication2.title || '';
	const title3 = publication3.title || '';

	const publisher1 = publication1.publisher || '';
	const publisher2 = publication2.publisher || '';
	const publisher3 = publication3.publisher || '';

	const releaseDate1 = publication1.releaseDate || '';
	const releaseDate2 = publication2.releaseDate || '';
	const releaseDate3 = publication3.releaseDate || '';

	const website1 = publication1.website || '';
	const website2 = publication2.website || '';
	const website3 = publication3.website || '';

	const summary1 = publication1.summary || '';
	const summary2 = publication2.summary || '';
	const summary3 = publication3.summary || '';

	// watch, errors
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			title1,
			title2,
			title3,
			publisher1,
			publisher2,
			publisher3,
			releaseDate1,
			releaseDate2,
			releaseDate3,
			website1,
			website2,
			website3,
			summary1,
			summary2,
			summary3,
		},
	});

	const addPublication = () => {
		if (numberOfPublications < MAX_NUMBER_OF_PUBLICATIONS) {
			setNumberOfPublications(numberOfPublications + 1);
		}
	};

	const onSubmit = (formData) => {
		const formEntries = Object.entries(formData);
		let newNumberOfPublications = 0;

		formEntries.forEach(([key, value]) => {
			setValue(key, value);
			if (key.match('title') && value) newNumberOfPublications += 1;
		});

		saveProfile(formData, 'publications');
		setNumberOfPublications(newNumberOfPublications);
	};

	return selected === 'edit-publications' ? (
		<div className="edit-publications edit-section-container">
			<form className="publications-form" onSubmit={handleSubmit(onSubmit)}>
				<SectionTitle text="Publications" />

				{/* Awards */}
				<div className="addable-edit-input">
					<InputContainer text="Title" name="title1" register={register} />
					<DoubleInput
						text1="Publisher"
						name1="publisher1"
						text2="Release Date"
						name2="releaseDate1"
						register={register}
					/>
					<InputContainer text="Website" name="website1" register={register} />
					<InputContainer text="Summary" name="summary1" register={register} />
				</div>

				{numberOfPublications >= 2 && (
					<div className="margin-top addable-edit-input">
						<InputContainer text="Title" name="title2" register={register} />
						<DoubleInput
							text1="Publisher"
							name1="publisher2"
							text2="Release Date"
							name2="releaseDate2"
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

				{numberOfPublications >= 3 && (
					<div className="margin-top addable-edit-input">
						<InputContainer text="Title" name="title3" register={register} />
						<DoubleInput
							text1="Publisher"
							name1="publisher3"
							text2="Release Date"
							name2="releaseDate3"
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
				{numberOfPublications < MAX_NUMBER_OF_PUBLICATIONS && (
					<AddFieldButton onClickFunc={addPublication} />
				)}
			</form>
		</div>
	) : null;
}

EditPublications.defaultProps = {
	myProfile: {},
};

EditPublications.propTypes = {
	myProfile: PropTypes.object,
	saveProfile: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

export default EditPublications;
