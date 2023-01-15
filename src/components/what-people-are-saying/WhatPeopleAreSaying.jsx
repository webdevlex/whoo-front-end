import React from 'react';

import { FaQuoteLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import temp from '../../assets/images/headshot1.jpg';
import img2 from '../../assets/images/headshot2.jpg';
import img3 from '../../assets/images/headshot3.jpg';
import './what-people-are-saying.scss';

export default function WhatPeopleAreSaying() {
	return (
		<section className='section what-people-are-saying-section '>
			<div className='container what-people-are-saying-contianer'>
				<h1 className='home-page-heading'>What People Are Saying</h1>
				{/*  */}
				<div className='all-quotes-container'>
					<div className='user-quote-container'>
						<div className='quote-image-wrapper'>
							<img className='quote-image' src={temp} alt='portrait of a man' />
						</div>
						<div className='quote-container'>
							<div className='quote-wrapper'>
								<FaQuoteLeft className='quote-icon' />
								<p className='quote'>
									Whoo lets me sleep easy, knowing my team is made up of trusted
									professionals. It makes it easy for us to communicate with
									eachother and get on with developing.
								</p>
							</div>
							<div className='quoter'>
								{/* <p className="quoter-name">Darren Rowse</p> */}
								<Link to='profile/DarrenRowse' className='quoter-name'>
									Darren Rowse
								</Link>
								<p className='quoter-title'>Senior Developer</p>
							</div>
						</div>
					</div>
					{/*  */}
					<div className='user-quote-container reverse'>
						<div className='quote-image-wrapper'>
							<img className='quote-image' src={img2} alt='portrait of a man' />
						</div>
						<div className='quote-container'>
							<div className='quote-wrapper'>
								<FaQuoteLeft className='quote-icon' />
								<p className='quote'>
									We are huge advocates of Whoo. It is a powerful platform that
									includes an amazing messaging system that makes working with a
									team easy. It makes consultants like me incredibly happy.
								</p>
							</div>
							<div className='quoter'>
								<Link to='profile/RebeccaGill' className='quoter-name'>
									Rebecca Gill
								</Link>
								<p className='quoter-title'>Web Savvy Marketing</p>
							</div>
						</div>
					</div>
					{/*  */}
					<div className='user-quote-container'>
						<div className='quote-image-wrapper'>
							<img className='quote-image' src={img3} alt='portrait of a man' />
						</div>
						<div className='quote-container'>
							<div className='quote-wrapper'>
								<FaQuoteLeft className='quote-icon' />
								<p className='quote'>
									Whoo helped me transform my hobby into a successful online
									business. I was able to get in touch with helpful
									professionals quickly and easily.
								</p>
							</div>
							<div className='quoter'>
								<Link to='profile/MikeRowley' className='quoter-name'>
									Mike Rowley
								</Link>
								<p className='quoter-title'>Feast Design Company</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
