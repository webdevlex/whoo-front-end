import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './test-website.scss';
import { loginUser } from '../../redux/actions/auth';

function TestWebsite({ loginUser }) {
	function handleTestClick() {
		console.log('Test');
		loginUser({
			email: 'test@gmail.com',
			password: 'Test123!',
		});
	}
	return (
		<button className='test-website-button' onClick={() => handleTestClick()}>
			Test Website
		</button>
	);
}

TestWebsite.propTypes = {
	loginUser: PropTypes.func.isRequired,
};

export default connect(null, { loginUser })(TestWebsite);
