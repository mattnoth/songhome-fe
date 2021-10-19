import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Axios from 'axios'
import {
	Container,
	Grid,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Box
} from '@material-ui/core'
import CircularProgress from '@mui/material/CircularProgress';
import ReactPlayer from 'react-player'

const ListView = ({ routerProps, baseUrl, theme, useStyles }) => {
	/**
	 * @ListView component returns a list of all the songs with players 
	 */
	// Material UI styles 
	const classes = useStyles()

	/** @type @state stores the list of songs and sets them into an array of objects */
	const [songlist, setSonglist] = useState([])

	//**placeholder variable for fetch call  */


	const songsUrl = `songs/`

	// boolean state variable to prevent component mount before data load 
	const [loading, setLoading] = useState(true)


	/** @index http method to grab full sit of songs and set songs to state. when the songs are set to state, @loading is set to false  */

	useEffect(function () {
		Axios(baseUrl + songsUrl)
			.then((data) => {
				console.log(data.data)
				setSonglist(data.data)
				setLoading(false)
			})
			.catch(console.error)
	}, [baseUrl, songsUrl])

	if (loading) {
		return (
			<Box sx={{ display: 'flex' }}>
				<CircularProgress />
			</Box>
		)
	}
	return (
		<>
			<Container maxwidth='lg'>
				<Grid container spacing={4} justifyContent='center'>
					{songlist.map((song) => (
						<Grid
							item xs={12}
							sm={6}
							lg={4}
							style={{ padding: '20px' }}
							key={song.id}
						>
							<NavLink to={'/song/' + song.id} style={{ textDecoration: 'none' }}>
								<Card >
									<div className={classes.details} key={song.id}>
										<CardContent>
											<Typography
												component='h5'
												variant='h5'
												style={{
													display: 'inline',
												}}>
												{song.name}
											</Typography>
											{song.comments.length ? (
												<Typography>
													{song.comments.length} unfinished tasks{' '}
												</Typography>
											) : <Typography> No Tasks reported. </Typography>}

											<Typography variant='subtitle1' color='textSecondary'>
												{song.status}
											</Typography>
											<CardMedia
												className={classes.cover}
												image={song.image}
												title='Live from space album cover'
											/>
											{
												// 350 px for a quick fix of git for the width; find a way to make the width dynamic 
											}
											<ReactPlayer
												url={song.file}
												width='350px'
												height='50px'
												playing={false}
												controls={true}
											/>
										</CardContent>
									</div>
								</Card>
							</NavLink>
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	)
}

export default ListView
