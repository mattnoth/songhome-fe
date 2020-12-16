import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Typography } from '@material-ui/core'

import ReactPlayer from 'react-player'


const SongDetails = ({ match }) => {

	const baseUrl = `https://blooming-earth-00957.herokuapp.com/`
	const [song, setSong] = useState({})

	const songId = match.params.id
	const fetchUrl = `${baseUrl}songs/${songId}`

	useEffect(function getSong() {
		Axios(fetchUrl)
			.then((data) => {
				console.log(data)
				setSong(data.data)
			})
			.catch((error) => {})
	})


	if (!song) {
		return <div> Loading ... </div>
    }
    


  







	return (
		<>
			<Typography variant='h3'>{song.name}</Typography>

			<ReactPlayer
				url={song.file}
				width='400px'
				height='50px'
				playing={false}
				controls={true}
			/>


		</>
	)
}

export default SongDetails
