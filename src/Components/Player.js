import React from 'react';

import CardMedia from '@material-ui/core/CardMedia'
import ReactPlayer from 'react-player'

const Player = ({ song }) => {
    return (
			<CardMedia
				style={{
					justify: 'center',
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