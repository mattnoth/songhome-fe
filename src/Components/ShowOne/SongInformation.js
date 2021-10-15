import React from 'react'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'

const SongInformation = ({ song }) => {
	//PROPS @song @editButton 
	// Renders the song information on the one song dashboard
	return (
		<CardContent
			style={{
				textAlign: 'left',
				width: '40%',
				float: 'left',
				display: 'inline-block'
			}}>
			<Typography variant='h5'>Status: {song.status}</Typography>
			<Typography variant='h6'>BPM: {song.bpm}</Typography>
			<Typography variant='h6'>Key: {song.key}</Typography>
		</CardContent>
	)
}

export default SongInformation
