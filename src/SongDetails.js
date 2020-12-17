import React, { useState, useEffect } from 'react'
import './App.css'
import Axios from 'axios'
import { Typography } from '@material-ui/core'

import ReactPlayer from 'react-player'
import SongComments from './SongComments'


const SongDetails = ({ match }) => {

	const baseUrl = `https://blooming-earth-00957.herokuapp.com/`
	const [song, setSong] = useState({})

	const songId = match.params.id
	const fetchUrl = `${baseUrl}songs/${songId}`

	useEffect(function getSong() {
		Axios(fetchUrl)
			.then((data) => {
				// console.log(data)
				setSong(data.data)
			})
			.catch((error) => {})
	}, [fetchUrl])


	if (!song) {
		return <div> Loading ... </div>
    }


	return (
		<>
			<Typography variant='h3'>{song.name}</Typography>
			<Typography variant='h5'>Status: {song.status}</Typography>
			<Typography variant='h6'>BPM: {song.bpm}</Typography>
			<Typography variant='h6'>Key: {song.key}</Typography> 
            <img className='detail-cover' src={song.image} alt=""/>

			<ReactPlayer
				url={song.file}
				width='400px'
				height='50px'
				playing={false}
				controls={true}
			/>

			<Typography variant='p'>{song.lyrics}</Typography>

			<SongComments song={song} setSong={setSong} baseUrl={baseUrl} />
		</>
	)
}

export default SongDetails
