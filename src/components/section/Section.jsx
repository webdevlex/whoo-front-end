import React from 'react';

import { FaCheck } from 'react-icons/fa';

import temp from '../../assets/images/temp.svg';
import './section.scss';

export default function section() {
	return (
		<section className="section">
			<div className="container">
				<div className="section-item section-image">
					<img
						className="section-img"
						src={temp}
						alt="illustration diagram of two users communicating through our app to accomplish their goal"
					/>
				</div>
				<div className="section-item section-text">
					<h4 className="home-page-heading">
						Our messaging system makes it easy to:
					</h4>
					<ul className="section-list">
						<li className="list-item">
							<FaCheck className="check-icon" />
							<p>Get in touch with professionals</p>
						</li>
						<li className="list-item">
							<FaCheck className="check-icon" />
							<p>Plan projects</p>
						</li>
						<li className="list-item">
							<FaCheck className="check-icon" />
							<p>Stay up to date</p>
						</li>
						<li className="list-item">
							<FaCheck className="check-icon" />
							<p>Get to know eachother</p>
						</li>
					</ul>
					<p className="home-page-sub-heading">
						Our simple messaging system allows you to quickly get in touch with
						other professionals to plan new projects, keep up to date on
						existsing projects or just get to know them.
					</p>
				</div>
			</div>
		</section>
	);
}
