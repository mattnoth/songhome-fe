import React, { useState, useEffect, useCallback } from 'react'
import Axios from 'axios'

import SongInformation from './SongInformation'
import Edit from '../Edit'
import SongTasks from './SongTasks'
import PostSongTask from './PostSongTask'
import Player from '../Player'

import { SkipBack } from 'react-feather'
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@mui/material/Box';
import { blueGrey } from '@material-ui/core/colors'


const OneSongDashboard = ({ match, history }) => {

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


	//** @TODO -- Have the edit button lead to a new route !! 
	//As of now, it is a simple boolean workaround to set to edit state */
	const editButton = (e) => {
		e.preventDefault()
		setEditState(true)
	}

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

	// if the editState is true render the Edit component, 
	// @Props takes song, fetchUrl, editState, setEditState, getSong 
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
				<SongInformation
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
