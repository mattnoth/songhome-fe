import React, { useState, useEffect } from 'react'
import SongStatus from './SongStatus'
import Edit from './Edit'
import SongTasks from './SongTasks'
import PostSongTask from './PostSongTask'
import Player from './Player'
import './details.css'

import Axios from 'axios'
import { Typography } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'



import { orange } from '@material-ui/core/colors'

const SongDash = ({ match, history }) => {

	// const baseUrl = `http://localhost:8000/`

	const baseUrl = 'https://blooming-earth-00957.herokuapp.com/'


	const [song, setSong] = useState({})

	const [editState, setEditState] = useState(false)

	const [comments, setComments] = useState([])

	const songId = match.params.id
	const fetchUrl = `${baseUrl}songs/${songId}/`

	const getSong = () => {
		 	Axios(fetchUrl)
				.then((data) => {
					setSong(data.data)
				})
	}

	useEffect(() => {
		getSong()

	}, [])

	
	const editButton = (e) => {
		e.preventDefault()
		setEditState(true)
	}

	const goBack = (e) => {
		e.preventDefault()
		history.goBack()
	}

	if (!song) {
		return <div> Loading ... </div>
	}

	if (editState) {
		return (
			<Edit
				song={song}
				fetchUrl={fetchUrl}
				editState={editState}
				setEditState={setEditState}
			/>
		)
	}

	return (
		<Container
			style={{
				backgroundColor: 'silver',
				height: '100vh',
			}}>
			<Button
				onClick={goBack}
				style={{
					display: 'inline',
					textAlign: 'left',
				}}>
				{' '}
				Go Back{' '}
			</Button>
			<Typography
				variant='h3'
				style={{
					display: 'inline',
				}}>
				{song.name}
			</Typography>

			<Grid container justify='space-between' col='10' spacing={6}>
				<Grid item xs={12} sm={6} lg={6}>
					<Card
						square
						style={{
							backgroundColor: orange[100],
							height: 200,
							justify:'center'
						}}>
						<SongStatus
							song={song}
							editButton={editButton}
							history={history}
						/>
					</Card>
				</Grid>

				<Grid item xs={12} sm={6} lg={4}>
					<SongTasks
						song={song}
						setSong={setSong}
						baseUrl={baseUrl}
						comments={comments}
						setComments={setComments}
						getSong={getSong}
					/>

				</Grid>
				<Grid item xs={12} sm={6} lg={6} justify='center' row>
					<Card
						square
						style={{
							backgroundColor: orange[100],
							padding: 20,
							justify: 'center',
							minWidth: '400px',
						}}>
						<Player song={song} />
					</Card>
				</Grid>

				<Grid item xs={12} sm={6} lg={4}>
					<Card
						square
						style={{
							minHeight: 100,
							backgroundColor: orange[100]
						}}>
						<PostSongTask
							song={song}
							comments={comments}
							setComments={setComments}
							getSong={getSong}
						
						/>
					</Card>
				</Grid>
			</Grid>
		</Container>
	)
}

export default SongDash
