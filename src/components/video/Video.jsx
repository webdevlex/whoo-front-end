import React from 'react';
import './video.scss';

export default function Video() {
	return (
		<div className='video-section container'>
			<div className='iframe-container'>
				<iframe
					title='test'
					width='1280'
					height='720'
					frameBorder={0}
					src='https://www.youtube.com/embed/F9jPEe4vgVQ'
				/>
			</div>
		</div>
	);
}
