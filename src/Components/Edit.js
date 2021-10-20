import React, { useState, useEffect, useCallback } from 'react'
import Axios from 'axios'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { blueGrey } from '@material-ui/core/colors'
import TextField from '@material-ui/core/TextField'


const Edit = ({ baseUrl, match }) => {

	//@Edit Form takes user input and form state to update song status

	/** 
	 * @TODO Move at least all songs into a data store 
	 */
	const [song, setSong] = useState({})

	/** @songId uses react router dom to grab the song ID for routing */
	const songId = match.params.id

	/** @fetchUrl grabs the song data  */
	const fetchUrl = `${baseUrl}songs/${songId}/`


	const nametxt = 'Name: ' + String(song?.name)
	const statustxt = 'Status: ' + String(song?.status)
	const bpmtxt = 'BPM: ' + String(song?.bpm)
	const keytxt = 'Key: ' + String(song?.key)

	//** @Type state variable array; stores formState and sets formstate */
	const [editFormState, setEditFormState] = useState({})

	///

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


	//**OnClick event for updating the song information */
	//** TODO history --  use the history.push go back  */

	const handleEditSubmit = (e) => {
		e.preventDefault()
		Axios.patch(fetchUrl, editFormState).then((response) => {
			getSong()
		})
	}

	//** @returns user input into state */
	const handleEditChange = (e) => {
		setEditFormState({ ...editFormState, [e.target.id]: e.target.value })
	}

	return (
		<Card
			style={{
				backgroundColor: blueGrey[100],
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
