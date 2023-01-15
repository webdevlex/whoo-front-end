import React from 'react';

import Footer from '../../components/footer/Footer';
import Hero from '../../components/hero/Hero';
import Howitworks from '../../components/how-it-works/Howitworks';
import Section from '../../components/section/Section';
import Video from '../../components/video/Video';
import WhatPeopleAreSaying from '../../components/what-people-are-saying/WhatPeopleAreSaying';

import './home.scss';

export default function Home() {
	return (
		<div className='home-page'>
			<Hero />
			<Howitworks />
			<Video />
			<Section />
			<WhatPeopleAreSaying />
			<Footer />
		</div>
	);
}
