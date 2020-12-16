import React, { useState } from 'react'

import Axios from 'axios'

const SongComments = ({ song, setSong, baseUrl }) => {
	const songId = song.id

	const songUrl = `${baseUrl}songs/`

	const [formState, setFormState] = useState({
		text: '',
		song_name: '',
	})

	const handleChange = (event, plant_id) => {
		setFormState({
			...formState,
			[event.target.id]: event.target.value,
			songId: songId,
		})
	}

	const handlePostComment = function () {
		const data = formState

		Axios.post(songUrl, data)
			.then((response) => console.log(response))

			.then(() => {
				fetch()
					.then((res) => res.json())
					.then((res) => {
						console.log(res)
					})
					.catch(console.error)
			})
	}

	return (
		<div>
			<form action='submit' onSubmit={handlePostComment}>
				<input
					type='text'
					id='song_name'
					placeholder='Name'
					onChange={handleChange}
				/>
				<input
					type='textarea'
					id='text'
					placeholder=''
					onChange={handleChange}
				/>
			</form>
		</div>
	)
}

export default SongComments
