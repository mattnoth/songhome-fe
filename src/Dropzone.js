import React from 'react';
import './App.css'

import Axios from 'axios'

import { useDropzone } from 'react-dropzone'

// create state for writers / genres, and then
// drag n drop packaage

function Basic({ file, setFile, music }) {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		onDrop: (files) => setFile(files[0]),
	})

	const files = acceptedFiles.map((file) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	))

	return (
		<div className='dropzone-container'>
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				<p> DRAG FILE HERE</p>
				<ul>{files}</ul>
			</div>
		</div>
	)
}

export default Basic;