import React from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import { orange } from '@material-ui/core/colors'

const DashboardGroupA = ({ song, editButton }) => {
	return (
		<>
			<CardContent
				style={{
					textAlign: 'left',
				}}>
				<Typography variant='h5'>Status: {song.status}</Typography>
				<Typography variant='h6'>BPM: {song.bpm}</Typography>
				<Typography variant='h6'>Key: {song.key}</Typography>
			</CardContent>
			<Button onClick={editButton}>EDIT</Button>

			<CardMedia
				style={{
					height: 200,
					width: 200,
				}}>
				<img src={song.image} alt='' />
			</CardMedia>
		</>
	)
}

export default DashboardGroupA
