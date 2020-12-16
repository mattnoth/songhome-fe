import React, { useState } from 'react'
import Axios from 'axios'

import { useDropzone } from 'react-dropzone'

// drag n drop packaage

function Basic(props) {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

	const files = acceptedFiles.map((file) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	))

	return (
		<section className='container'>
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
			<aside>
				<h4>Files</h4>
				<ul>{files}</ul>
			</aside>
		</section>
	)
}

const Createsong = ({ baseUrl }) => {
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

	const [formState, setFormState] = useState(initialState)

	const url = `${baseUrl}songs/`

	const handleChange = (e) => {
		setFormState({ ...formState, [e.target.id]: e.target.value })
	}

	const handleSubmit = function (e) {
		const data = formState
		e.preventDefault()

		Axios.post(url, data).then((response) => {
			console.log(response)
		})
	}

	return (
		<>
			<div>Hello This is create song</div>
			<Basic />

			<form action='submit' onSubmit={handleSubmit}>
				<label htmlFor='Song Name'> Song Name </label>
				<input type='text' id='name' onChange={handleChange} />
				<br />

				<label htmlFor='status'> status </label>
				<input type='text' id='status' onChange={handleChange} />
				<br />

				<label htmlFor='BPM'> BPM </label>
				<input type='text' id='bpm' onChange={handleChange} />
				<br />

				<label htmlFor='Release Date'> Release Date </label>
				<input type='text' id='release_date' onChange={handleChange} />
				<br />

				<label htmlFor='key'> Key </label>
				<input type='text' id='key' onChange={handleChange} />
				<br />

				<label htmlFor='writer'> writer </label>
				<input type='text' id='writers' onChange={handleChange} />
				<br />

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
