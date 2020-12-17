import React, { useState } from 'react'
import Axios from 'axios'
import Dropzone from './Dropzone'
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router'

const Createsong = ({ baseUrl }) => {
	const [loading, setLoading] = useState(false)

	const initialState = {
		name: '',
		image: '',
		file: '',
		release_date: '',
		bpm: '',
		status: '',
		key: '',
		lyrics: '',
		writers: {
			name: '',
			pub_percent: '',
		},
		genres: {
			name: '',
		},
		tags: {
			name: '',
		},
	}

	let history = useHistory()
	const [file, setFile] = useState('')
	const [image, setImage] = useState('')

	const [formState, setFormState] = useState(initialState)
	const url = `${baseUrl}songs/`

	const handleChange = (e) => {
		setFormState({ ...formState, [e.target.id]: e.target.value })
	}

	const handleSubmit = function (e) {
		e.preventDefault()

		const config = { headers: { 'Content-Type': 'multipart/form-data' } }

		let fd = new FormData()
		fd.append('file', file)
		fd.append('image', image)
		fd.append('name', formState.name)
		fd.append('status', formState.status)
		fd.append('bpm', formState.bpm)
		fd.append('key', formState.key)

		setLoading(true)

		Axios.post(url, fd, config).then((response) => {
			console.log(response)
			setLoading(false)
			let newId = response.data.id

			history.push(`/song/${newId}`)
		})
	}

	if (loading) {
		return <div> uploading....... </div>
	}

	return (
		<>
			<div>CREATE SONG</div>

			<form action='submit' onSubmit={handleSubmit}>
				<label htmlFor='Song Name'> Song Name </label>
				<input type='text' id='name' onChange={handleChange} />
				<br />
				<p>Drop your music file here! </p>
				<Dropzone file={file} setFile={setFile} />

				<label htmlFor='status'> status </label>
				<input type='text' id='status' onChange={handleChange} />
				<br />

				<p>Drop your image file here! </p>
				<Dropzone file={image} setFile={setImage} />

				<label htmlFor='BPM'> BPM </label>
				<input type='text' id='bpm' onChange={handleChange} />
				<br />

				{/* <label htmlFor='Release Date'> Release Date </label>
				<input type='text' id='release_date' onChange={handleChange} />
				<br /> */}

				<label htmlFor='key'> Key </label>
				<input type='text' id='key' onChange={handleChange} />
				<br />

				{/* <label htmlFor='writer'> writer </label>
				<input type='text' id='writers' onChange={handleChange} />
				<br /> */}

				<button onClick={handleSubmit}> Submit </button>

				{/* <label htmlFor='Song Name'> Song Name </label>
				<input type='text' id='name' onChange={handleChange} />
				<br />
				<label htmlFor='Song Name'> Song Name </label>
				<input type='text' id='name' onChange={handleChange} />
				<br />
				<label htmlFor='Song Name'> Song Name </label>
				<input type='text' id='name' onChange={handleChange} /> */}
			</form>
		</>
	)
}

export default Createsong
