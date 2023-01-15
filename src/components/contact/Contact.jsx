import React from 'react';

import './contact.scss';
import PropTypes from 'prop-types';
import { FaMailBulk } from 'react-icons/fa';

import InfoLine from '../info-line/InfoLine';
import ClickableInfoLine from '../clickable-info-line/ClickableInfoLine';
import ProfileTabs from '../profile-tabs/ProfileTabs';

function Contact({ profileInfo, profileToView, width }) {
	const { profileBeingViewed } = profileToView;
	const { basics } = profileBeingViewed;
	const phone = basics.phone || '';
	const location = basics.location || {};
	const address = location.address || '';
	const city = location.city || '';
	const region = location.region || '';
	const postalCode = location.postalCode || '';
	const email = basics.email || '';
	const websites = profileBeingViewed.websites || [];

	const contactTabSelected = profileInfo === 'Contact';

	return contactTabSelected || width < 769 ? (
		<div className='section'>
			{width < 769 && (
				<ProfileTabs name='Contact' icon={<FaMailBulk className='icon' />} />
			)}

			<div
				className={`mobile-revealer-wrapper ${
					contactTabSelected ? 'reveal-info ' : null
				}`}>
				<div className='sub-section-wrapper'>
					<p className='section-title'>CONTACT INFORMATION</p>
					<div className='sub-section '>
						{phone && <InfoLine title='Phone' info={phone} color='color' />}
						{address && (
							<div className='info-line'>
								<p className='info-line-title'>Address:</p>

								<div className='address-container'>
									<p className='info-line-user-info'>
										{address}
										{address && (city || region || postalCode) && ', '}
										<br />
										{city}
										{city && (region || postalCode) && ', '}
										{region}
										{region && postalCode && ', '}
										{postalCode}
									</p>
								</div>
							</div>
						)}
						{/* {email && <InfoLine title="Email" info={email} color="color" />} */}
						{email && (
							<div className='info-line'>
								<p className='info-line-title'>Email:</p>

								<a
									href={`mailto:${email}`}
									className='info-line-user-info color email'>
									{email}
								</a>
							</div>
						)}
						{websites.length > 0 &&
							websites.map(({ website, _id }) => (
								<ClickableInfoLine title='Website' info={website} key={_id} />
							))}
					</div>
				</div>
			</div>
		</div>
	) : null;
}

Contact.propTypes = {
	profileToView: PropTypes.object.isRequired,
	profileInfo: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
};

export default Contact;
