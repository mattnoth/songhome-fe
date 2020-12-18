import React, { useState } from 'react'
import Axios from 'axios'

import './details.css'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { yellow } from '@material-ui/core/colors'
import TextField from '@material-ui/core/TextField'


const Edit = ({ song, fetchUrl, setEditState }) => {

	const nametxt = 'Name: ' + String(song.name)
	const statustxt = 'Status: ' + String(song.status)
	const bpmtxt = 'BPM: ' + String(song.bpm)
	const keytxt = 'Key: ' + String(song.key)

	const [editFormState, setEditFormState] = useState({})

	const handleEditSubmit = (e) => {
		e.preventDefault()
  
        Axios.patch(fetchUrl, editFormState).then((response) => {
            console.log(response)
            setEditState(false)
        })
	}

	const handleEditChange = (e) => {
		setEditFormState({ ...editFormState, [e.target.id]: e.target.value })
    }
    
	return (
		<Card
			style={{
				backgroundColor: yellow[100],
				minHeight: '10vh',
			}}>
			<CardContent
				style={{
					textAlign: 'center',
					alignItems: 'center',
				}}>
				<form action='submit' onSubmit={handleEditSubmit}>
					<TextField
						id='name'
						label={nametxt}
						onChange={handleEditChange}
						style={{
							padding: 20,
							width: '30vw',
						}}></TextField>
					<br />
					<TextField
						id='status'
						label={statustxt}
						onChange={handleEditChange}
						style={{
							padding: 20,
							width: '30vw',
						}}></TextField>
					<br />
					<TextField
						id='bpm'
						label={bpmtxt}
						onChange={handleEditChange}
						style={{
							padding: 20,
							width: '30vw',
						}}></TextField>
					<br />
					<TextField
						id='key'
						label={keytxt}
						onChange={handleEditChange}
						style={{
							padding: 20,
							width: '30vw',
						}}></TextField>
					<br />
                    <Button onClick={handleEditSubmit}> SUBMIT CHANGES </Button>
				</form>
			</CardContent>
		</Card>
	)
}

export default Edit
