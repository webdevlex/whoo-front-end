import React from 'react';

import { FaUserPlus, FaAddressCard, FaLink } from 'react-icons/fa';

import './how-it-works.scss';

export default function Howitworks() {
	return (
		<section className="how-it-works-section">
			<div className="container">
				<h1 className="home-page-heading">How It Works</h1>
				<p className="home-page-sub-heading">
					Whoo provides users a platform to tell others about yourself so you
					can easily connect and collaberate.
				</p>
				<div className="steps-container">
					<div className="step step-one">
						<FaUserPlus className="step-icon" />
						<p className="step-title">Sign Up</p>
						<p className="step-desc">
							Create a free whoo account in just a few moments.
						</p>
					</div>
					<div className="step step-two">
						<FaAddressCard className="step-icon" />
						<p className="step-title">Tell us about yourself</p>
						<p className="step-desc">
							Fillout the information you would like to share with others.
						</p>
					</div>
					<div className="step step-three">
						<FaLink className="step-icon" />
						<p className="step-title">Connect</p>
						<p className="step-desc">
							Search for other like minded individuals, add them as a friends,
							and collaberate!
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
