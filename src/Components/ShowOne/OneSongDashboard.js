import React, { useState, useEffect, useCallback } from 'react'
import Axios from 'axios'

import SongInformation from './SongInformation'
import SongTasks from './SongTasks'
import PostSongTask from './PostSongTask'
import Player from '../Player'

import { SkipBack } from 'react-feather'
import { makeStyles } from '@material-ui/core'
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@mui/material/Box';
import Paper from '@material-ui/core/Paper'

import { blueGrey } from '@material-ui/core/colors'
import { grey100 } from 'material-ui/styles/colors'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
	root: {
		backgroundColor: grey100,

	},
	header: {
		alignItems: 'center',

	},
	artwork: {
		height: '200px',
		width: '200px',
		display: 'flex',
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '20px'
	}

})

const OneSongDashboard = ({ match, history }) => {

	/** @returns Individual song route  */

	/** allows for the application of material UI classes */
	const classes = useStyles()

	/** @const baseUrl is a placeholder for the initial API */
	const baseUrl = 'https://blooming-earth-00957.herokuapp.com/'

	/** @type @state holds song object  */
	const [song, setSong] = useState({})

	/** @type @state edit state if true opens up edit 'modal' */
	// const [editState, setEditState] = useState(false)

	/**@type @state contains comments to render */
	const [comments, setComments] = useState([])

	/** @songId uses react router dom to grab the song ID for routing */
	const songId = match.params.id

	/** @fetchUrl grabs the song data  */
	const fetchUrl = `${baseUrl}songs/${songId}/`

	/**@const @getSong ueses @useCallBack hook; memoizes version of funciton that only changes if @fetchUrl changes @link https://reactjs.org/docs/hooks-reference.html#usecallback */

	const getSong = useCallback(
		() => {
			Axios(fetchUrl)
				.then((data) => {
					setSong(data.data)
				})
		}, [fetchUrl]
	);

	/** @useEffect - runs the @getSong callback  */
	useEffect(() => {
		getSong()
	}, [getSong])

	//take the history object to go back within the app 
	const goBack = (e) => {
		e.preventDefault()
		history.goBack()
	}

	// ensures the song is loaded, if not, display the loader 
	if (!song) {
		return (
			<Box sx={{ display: 'flex' }}>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Paper className={classes.root}>
			<Grid container spacing={2}>
				<Grid container xs={12} className={classes.header}>
					<Grid item xs={2}>
						<Button
							onClick={goBack}
						>
							{' '}
							<SkipBack />
							{' '}
						</Button>
					</Grid>
					<Grid item xs={8}>
						<Typography
							variant='h4'
							style={{
								'textAlign': 'center'
							}}

						>
							{song.name}
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<Link to={`/song/${song.id}/edit`}>
							<Button secondary>
								EDIT
							</Button>
						</Link>
					</Grid>
				</Grid>
				<Grid
					container
					direction="column"
					alignItems="center"
					justifyContent="center">
					<img className={classes.artwork} src={song.image} alt='' />
				</Grid>
				<Grid item xs={12}>
					<Box
						square
						style={{
							backgroundColor: blueGrey[20],
							padding: 20,
							justify: 'center',
						}}>
						<Player song={song} />
					</Box>
				</Grid>
				<Grid container xs={12}>
					<SongInformation
						song={song}
						history={history}
					/>
				</Grid>
				<Grid container xs={12}>
					<Box
						square
						style={{
							backgroundColor: blueGrey[20],
							padding: 20,
							justify: 'center',
							display: "flex",
							justifyContent: "center",
							alignItems: 'center'
						}}>
						<PostSongTask
							song={song}
							comments={comments}
							setComments={setComments}
							getSong={getSong}
						/>
						<SongTasks
							song={song}
							setSong={setSong}
							baseUrl={baseUrl}
							comments={comments}
							setComments={setComments}
							getSong={getSong}
						/>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default OneSongDashboard;
