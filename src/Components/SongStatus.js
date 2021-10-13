import React from 'react'
import './details.css'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'

const SongStatus = ({ song, editButton }) => {
	return (
		<>
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
				<Button onClick={editButton}>EDIT</Button>
			</CardContent>

			<CardMedia
				style={{
					height: 200,
					width: '40%',
					float: 'right',
					display: 'inline-block'
				}}>
				<img className='album' src={song.image} alt='' />
			</CardMedia>
			<CardContent>

			</CardContent>
		</>
	)
}

export default SongStatus
