import React from 'react';

import { Link } from 'react-router-dom';

import logo from '../../assets/images/Who-Are-You-Logo.svg';
import './footer.scss';

export default function Footer() {
	return (
		<div className="footer">
			<div className="container">
				<div className="footer-top">
					<div className="footer-text">
						<h1 className="home-page-heading">Ready to start your journey?</h1>
						<p className="home-page-sub-heading">
							Create a free whoo account in just a few moments, add friends and
							collaberate!
						</p>
					</div>

					<div className="button-container">
						<Link className="default-button sign-in" to="/sign-in">
							Sign In
						</Link>
						<Link className="default-button sign-up" to="/sign-up">
							Sign Up
						</Link>
					</div>
				</div>
				<div className="footer-bottom">
					<div className="footer-logo-container">
						<img className="footer-logo" src={logo} alt="company logo" />
					</div>
					<p className="copyright-text">Copyright © 2021 Whoo</p>
				</div>
			</div>
		</div>
	);
}
