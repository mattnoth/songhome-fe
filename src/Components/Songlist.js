import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Axios from 'axios'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import ReactPlayer from 'react-player'

const Songlist = ({ routerProps, baseUrl, theme, useStyles }) => {
	const classes = useStyles()
	const [songlist, setSonglist] = useState([])
	const songsUrl = `songs/`
	const [loading, setLoading] = useState(true)

	useEffect(function () {
		Axios(baseUrl + songsUrl)
			.then((data) => {
				setSonglist(data.data)
				setLoading(false)
			})
			.catch(console.error)
	}, [])
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

export default Songlist
