import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Axios from 'axios'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'




import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SkipNextIcon from '@material-ui/icons/SkipNext'

import IconButton from '@material-ui/core/IconButton'


import ReactPlayer from 'react-player'

const Songlist = ({ routerProps, baseUrl, theme, useStyles }) => {
    
   const classes = useStyles()
	

    
    const [songlist, setSonglist] = useState([])


	const songsUrl = `songs/`

	useEffect(function () {
		// console.log(process.env.NODE_ENV)
		Axios(baseUrl + songsUrl)
			.then((data) => {
				console.log(data)
				setSonglist(data.data)
			})
			.catch(console.error)
		//eslint-disable-next-line
    }, [])
    

	return (
		<Container maxWidth='lg'>
			<Grid container spacing={4} justify='center'>
				{songlist.map((song) => (
					<Grid item xs={12} sm={6} lg={4}>
						<NavLink to={'/song/' + song.id}>
							<Card>
								<div className={classes.details}>
									<CardContent>
										<Typography component='h5' variant='h5'>
											{song.name}
										</Typography>
										<Typography variant='subtitle1' color='textSecondary'>
											{song.status}
										</Typography>

										<img src={song.image} className='image-paper' alt='' />

										<CardMedia
											className={classes.cover}
											image={song.image}
											title='Live from space album cover'
										/>

										<ReactPlayer
											url={song.file}
											width='400px'
											height='50px'
											playing={false}
											controls={true}
										/>
									</CardContent>
									{/* <div className={classes.controls}> */}
									{/* <IconButton aria-label='previous'>
										{theme.direction === 'rtl' ? (
											<SkipNextIcon />
										) : (
											<SkipPreviousIcon />
										)}
									</IconButton> */}

									{/* <IconButton aria-label='play/pause'>
										<PlayArrowIcon className={classes.playIcon} />
									</IconButton> */}
									{/* <IconButton aria-label='next'>
										{theme.direction === 'rtl' ? (
											<SkipPreviousIcon />
										) : (
											<SkipNextIcon />
										)}
									</IconButton> */}
									{/* </div> */}
								</div>
							</Card>
						</NavLink>

						{/* <NavLink to={'/song/' + song.id}>
							<Paper style={{ height: 200, width: '100%' }} variant='primary'>
								<Typography variant='h6'>{song.name}</Typography>
								<ReactPlayer
									url={song.file}
									width='400px'
									height='50px'
									playing={false}
									controls={true}
								/>
                                
							</Paper>
						</NavLink> */}
					</Grid>
				))}
			</Grid>
		</Container>
	)
}

export default Songlist
