import React from 'react'
import './details.css'
import Paper from '@material-ui/core/Paper'
import { useDropzone } from 'react-dropzone'

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
		<div {...getRootProps({ className: 'dropzone' })}>
			<input {...getInputProps()} />
			<Paper
				style={{
					height: 40,
					width: '60vw',
				}}>
				{' '}
			</Paper>

			<ul>{files}</ul>
		</div>
	)
}

export default Basic
