import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Axios from 'axios'

import { Container, Grid, Typography, Card, CardContent, CardMedia } from '@material-ui/core'


import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import ReactPlayer from 'react-player'

const ListView = ({ routerProps, baseUrl, theme, useStyles }) => {
	/**
	 * @ListView component returns a list of all the songs with players 
	 * 
	 */

	// Material UI styles 
	const classes = useStyles()

	/** @type @state stores the list of songs and sets them into an array of objects */
	const [songlist, setSonglist] = useState([])

	//**placeholder variable for fetch call  */


	const songsUrl = `songs/`

	// boolean state variable to prevent component mount before data load 
	const [loading, setLoading] = useState(true)


	/** index method   */
	useEffect(function () {
		Axios(baseUrl + songsUrl)
			.then((data) => {
				setSonglist(data.data)
				setLoading(false)
			})
			.catch(console.error)
	}, [songlist])

	if (loading) {
		return (
			<div>loading....</div>
		)

	}
	return (
		<>
			<Container maxWidth='lg'>
				<Typography component='h1'>Song List</Typography>
				<Grid container spacing={4} justify='center'>
					{songlist.map((song) => (
						<Grid item xs={12} sm={6} lg={4}>
							<NavLink to={'/song/' + song.id}>
								<Card>
									<div className={classes.details}>
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
											{/* <img src={song.image} className='image-paper' alt='' /> */}
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
