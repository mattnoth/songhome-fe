import React, { useState, useEffect, useCallback } from 'react'
import SongStatus from './SongStatus'
import Edit from './Edit'
import SongTasks from './SongTasks'
import PostSongTask from './PostSongTask'
import Player from './Player'
import { SkipBack } from 'react-feather'

import CircularProgress from '@mui/material/CircularProgress';

import Axios from 'axios'
import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@mui/material/Box';

// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';

import { blueGrey } from '@material-ui/core/colors'

const OneSongDashboard = ({ match, history }) => {

	// const Item = styled(Paper)(({ theme }) => ({
	// 	...theme.typography.body2,
	// 	padding: theme.spacing(1),
	// 	textAlign: 'center',
	// 	color: theme.palette.text.secondary,
	// }));

	/** @returns Individual song route  */

	/** @const baseUrl is a placeholder for the initial API */
	const baseUrl = 'https://blooming-earth-00957.herokuapp.com/'

	/** @type @state holds song object  */
	const [song, setSong] = useState({})

	/** @type @state edit state if true opens up edit 'modal' */
	const [editState, setEditState] = useState(false)

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


	const editButton = (e) => {
		e.preventDefault()
		setEditState(true)
	}

	const goBack = (e) => {
		e.preventDefault()
		history.goBack()
	}

	if (!song) {
		return (
			<Box sx={{ display: 'flex' }}>
				<CircularProgress />
			</Box>
		)
	}

	if (editState) {
		return (
			<Edit
				song={song}
				fetchUrl={fetchUrl}
				editState={editState}
				setEditState={setEditState}
				getSong={getSong}
			/>
		)
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2} >
				<Grid item xs={1}>
					<Button
						onClick={goBack}
						style={{
							display: 'inline',
							textAlign: 'left',
						}}>
						{' '}
						<SkipBack />
						{' '}
					</Button>
				</Grid>
				<Typography
					variant='h3'>
					{song.name}
				</Typography>
				<SongStatus
					song={song}
					editButton={editButton}
					history={history}
				/>
				<Grid
					item
					xs={12}
					sm={6}
					lg={6}
					justifyContent='center'
					row>
					<Box
						square
						style={{
							backgroundColor: blueGrey[100],
							padding: 20,
							justify: 'center',
							minWidth: '400px',
						}}>
						<Player song={song} />
					</Box>
				</Grid>
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
			</Grid>
		</Box>
	)
}

export default OneSongDashboard;
