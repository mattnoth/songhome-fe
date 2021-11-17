import React, { useState } from 'react'
import Axios from 'axios'
import Dropzone from './Dropzone'

import { useHistory } from 'react-router'

import Container from '@material-ui/core/Container'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { blueGrey } from '@material-ui/core/colors'

const Createsong = ({ baseUrl }) => {

	// Returns form for CreateSong form for create new song 
	//@Props, takes the baseUrl 

	//@state loading, sets and checks songlist status 
	const [loading, setLoading] = useState(false)

	//history - react router dom prop 
	const history = useHistory()

	//@state - file -- song file into state when dropped into the drag and drop 
	const [file, setFile] = useState('')

	//@state image -- stores the image file into state when dropped 
	const [image, setImage] = useState('')

	//@state initial state of the form-- includes all routes 
	//TODO add form points for each song object property 
	const initialState = {
		name: '',
		image: '',
		file: '',
		release_date: '',
		bpm: '',
		status: '',
		key: '',
		lyrics: '',
		writers: {
			name: '',
			pub_percent: '',
		},
		genres: {
			name: '',
		},
		tags: {
			name: '',
		},
	}


	//@state - total form state object || set to inital state at first render 
	// @setFormState -- setter for the form after user input
	const [formState, setFormState] = useState(initialState)

	//
	const url = `${baseUrl}songs/`

	const handleChange = (e) => {
		setFormState({ ...formState, [e.target.id]: e.target.value })
	}

	const handleSubmit = function (e) {
		e.preventDefault()

		const config = { headers: { 'Content-Type': 'multipart/form-data' } }

		let fd = new FormData()
		fd.append('file', file)
		fd.append('image', image)
		fd.append('name', formState.name)
		fd.append('status', formState.status)
		fd.append('bpm', formState.bpm)
		fd.append('key', formState.key)

		setLoading(true)

		Axios.post(url, fd, config).then((response) => {

			setLoading(false)
			let newId = response.data.id

			history.push(`/song/${newId}`)
		})
	}

	if (loading) {
		return <CircularProgress />
	}

	return (
		<Container
			maxwidth='xl'
			style={{
				padding: 20,
				maxwidth: 1000,
				// height: '100vh',
				backgroundColor: 'gray',
			}}>
			<Grid
				container
				height='100vh'
				width='50vw'
				justifyContent='center'
				maxwidth='lg'
				style={{
					backgroundColor: blueGrey[200],
					height: '100vh',
				}}>
				<Paper
					variant='outlined'
					square
					width='100%'
					style={{
						width: '60vw',
						backgroundColor: 'lightgray',
					}}>
					<Grid item>
						<Typography component='h3'>CREATE SONG</Typography>
					</Grid>

					<form action='submit' onSubmit={handleSubmit}>
						<Grid item xs={12} sm={12} lg={12}>
							<TextField
								id='name'
								label='Song Name'
								onChange={handleChange}
								style={{
									padding: 10,
									width: '30vw',
								}}>
								{' '}
							</TextField>
						</Grid>

						<Grid item xs={12} sm={12} lg={12}>
							<br />
							<p className='dropzone'>Drop your music file here! </p>
							<Paper>
								<Dropzone file={file} setFile={setFile} />
							</Paper>
						</Grid>

						<Grid item xs={12} sm={12} lg={12}>
							<TextField
								id='status'
								label='Song Status'
								onChange={handleChange}
								style={{
									padding: 10,
									width: '30vw',
								}}></TextField>
						</Grid>

						<Grid item xs={12} sm={12} lg={12}>
							<Typography>Drop your image file here! </Typography>
							<Paper>
								<Dropzone file={image} setFile={setImage} />
							</Paper>
						</Grid>

						<Grid item xs={12} sm={12} lg={12}>
							<TextField
								id='bpm'
								label='BPM'
								onChange={handleChange}
								style={{
									padding: 10,
									width: '30vw',
								}}></TextField>
							<br />
						</Grid>

						<Grid item xs={12} sm={12} lg={12}>
							<TextField
								id='key'
								label='Key'
								onChange={handleChange}
								style={{
									padding: 10,
									width: '30vw',
								}}></TextField>
							<br />
						</Grid>
						<Grid item xs={12} sm={12} lg={12}>
							<Button type='submit'

							> Submit </Button>
						</Grid>
					</form>
				</Paper>
			</Grid>
		</Container>
	)
}

export default Createsong
