import React from 'react';
import CardMedia from '@material-ui/core/CardMedia'
import ReactPlayer from 'react-player'

const Player = ({ song }) => {
	//** @song file brought down as a prop */
	// ReactPlayer is a simple player npm package; takes file, playing, controls as props 
	return (
		<CardMedia
			style={{
				justifyContent: 'center',
				position: 'center',
			}}>
			<ReactPlayer
				url={song.file}
				width='1fr'
				height='50px'
				playing={false}
				controls={true}
			/>
		</CardMedia>
	)
};

export default Player;